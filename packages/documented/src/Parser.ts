import * as camelcase from 'lodash.camelcase'
import { info, param } from './utils/out'
import { APIDocument } from './APIDocument'
import { createSourceFile, forEachChild, ScriptTarget, SyntaxKind, Node, JSDoc } from 'typescript'
import { promises as fs } from 'fs'
import { getExportDeclaration, getVariableExport } from './utils/indexParsing'
import {
	CommentObject,
	ReflectionFlagsObject,
	ParameterReflectionObject,
	TypeObject,
	TypeContainer,
} from 'typedoc/dist/lib/serialization'
import {
	isNodeWithJSDoc,
	isClassReflection,
	isMethodReflection,
	isNodeOpaque,
	isNodeInternal,
	isCallableNode,
} from './utils/predicates'
import { typeToString } from './utils/typeHandling'
import { fixReferences, refs } from './utils/refs'
import * as debugFactory from 'debug'
import { relative } from 'path'
const debug = debugFactory('element:docs')

export type NodeLike = {
	name: string
	kindString?: string

	children?: NodeLike[]

	comment?: CommentObject
}

function stripQuotes(name: string): string {
	if (name.startsWith('"') && name.endsWith('"')) {
		return name.slice(1, name.length - 1)
	} else {
		return name
	}
}

class Context {
	constructor(private mod: string, private parser: Parser) {}

	forModule(mod: string): Context {
		return new Context(stripQuotes(mod), this.parser)
	}

	docForKey(key: string): APIDocument {
		const fullKey = `${this.mod}.${key}`
		const pageName = this.parser.index.indexMap[fullKey]
		// debug('fullKey %s pageName %s', fullKey, pageName)

		// if (pageName === undefined) return this.parser.catchallDoc

		// const path = `api/${pageName}.md`

		return this.parser.documents.get(pageName) || this.parser.catchallDoc
	}
}

export type NodeWithDoc = Node & {
	jsDoc: JSDoc[]
}

type CallSignatureType = TypeContainer & {
	kindString: 'Call signature' | string
	name: string
	flags: ReflectionFlagsObject
	parameters?: Parameter[]
	comment?: CommentObject
}

export type CallSignatureWriteParam = {
	name: string
	type: TypeObject
	desc: string
	isReference: boolean
	isOptional: boolean
	defaultValue: any
}

type Parameter = ParameterReflectionObject & {
	kindString: 'Parameter'
	name: string
	type: TypeObject
	flags: ReflectionFlagsObject
}

export type NodeWithCallSignature = NodeLike & {
	signatures: CallSignatureType[]
}

export type MethodReflection = NodeLike & {
	implementationOf: CallSignatureType
}
export type ClassReflection = NodeLike & {}

export type ParseIndex = {
	indexMap: { [key: string]: string }
	indexExports: { [key: string]: string }
}

const toFileName = (file: string): string => `${file}.md`

const generateAnchor = (name: string) =>
	name
		.toLowerCase()
		.replace(/\s+/gi, '-')
		.replace(/[^a-z0-9-_]/gi, '')

const writeComment = (doc: APIDocument, comment: any) => {
	let { shortText, text } = comment || { shortText: null, text: null }
	doc.comment(fixReferences(shortText), fixReferences(text))
}

const commentToString = (comment: any): string => {
	let { shortText, text } = comment || { shortText: null, text: null }
	return [fixReferences(shortText), fixReferences(text)].join('\n')
}

export class Parser {
	public catchallDoc: APIDocument = new APIDocument()
	public documents: Map<string, APIDocument>
	public index: ParseIndex

	/**
	 * Stores references between Classes and Class Method combinations and the document.
	 *
	 * Data format:
	 * "ClassName": "ClassName.md#class-name-slug"
	 * "ClassName.method": "ClassName.md#class-name-method-slug"
	 *
	 * @type {Map<string, string>}
	 */
	public references: Map<string, string>

	private visitors = {
		Variable: this.visitVariable,
		Module: this.visitClass,
		Enumeration: this.visitClass,
		Class: this.visitClass,
		Interface: this.visitClass,
		Function: this.visitFunction,
		Property: this.visitProperty,
		Method: this.visitMethod,
		'Enumeration member': this.visitEnumerationMember,
		'External module': this.visitExternalModule,
		'Type alias': this.visitAlias,
		'Object literal': this.visitObjectLiteral,
	}

	constructor(private rootPath: string, private typeDoc: NodeLike, private indexTS: string) {
		this.documents = new Map()
		this.references = new Map()
	}

	public async parse() {
		this.index = await this.preParseIndex(this.indexTS)
		let files = [...new Set(Object.values(this.index.indexExports))]
		console.dir(this.index, { depth: null })

		for (const [key, target] of Object.entries(refs)) {
			this.addReference(key, target)
		}

		for (const [key, target] of Object.entries(this.index.indexExports)) {
			this.addReference(key, target)
		}

		files.forEach(file => {
			this.documents.set(file, new APIDocument())
		})

		this.walk(this.typeDoc)

		this.associateMissingReferences()

		return this.documents
	}

	private associateMissingReferences() {
		this.documents.forEach(doc => {
			doc.definition(b => {
				doc.orphanedReferences.forEach(ref => {
					let target = this.references.get(ref.identifier)
					// TODO: Convert `target` to proper file path
					if (target) {
						let link
						if (target.startsWith('http')) {
							link = target
						} else {
							link = `${relative(this.rootPath, target)}#${generateAnchor(ref.identifier)}`
						}

						b.definition(ref.identifier, link)
					}
				})
			})
		})
	}

	async preParseIndex(fileName: string) {
		const ctx: ParseIndex = {
			indexMap: {},
			indexExports: {},
		}

		const source = createSourceFile(
			fileName,
			await fs.readFile(fileName).then(file => file.toString('utf8')),
			ScriptTarget.ES2015,
			/* setParentNodes */ true,
		)

		forEachChild(source, node => {
			switch (node.kind) {
				case SyntaxKind.ExportDeclaration:
					if (isNodeWithJSDoc(node)) getExportDeclaration(ctx, node)
					break
				case SyntaxKind.VariableStatement:
					if (isNodeWithJSDoc(node)) getVariableExport(ctx, node)
					break
			}
		})

		return ctx
	}

	walk(node: NodeLike, doc?: APIDocument) {
		const { name, kindString } = node

		// console.log(`${info(kindString)} ${param(name)}`)

		// if (isClassReflection(node)) {
		let maybeDoc = this.documentForName(name)
		if (maybeDoc) {
			doc = maybeDoc
			this.visit(node, doc)
		} else {
			console.log(info(`Missing doc for ${node.name}`))
		}
		// } else {
		// 	console.error(`Not a class reflection: ${JSON.stringify(node, null, 2)}`)
		// }

		if (node.children)
			node.children.forEach(node => {
				this.walk(node, doc)
			})
	}

	visit(node: NodeLike, doc?: APIDocument) {
		if (node.kindString) {
			debug(`Visit ${node.kindString}: ${node.name}`)

			let visitor = this.visitors[node.kindString]
			if (visitor) {
				visitor.apply(this, [node, doc])
			} else {
				console.log(info(`TODO: ${node.kindString}`))
			}
		} else {
			console.error(`ERR: Unknown node type: ${node.name}`)
		}
	}

	private visitClass(node: NodeLike, doc?: APIDocument) {
		let { name, children } = node
		debug(`Visit ${node.kindString}: ${name}`)

		// let doc = this.documentForName(name)
		if (!doc) return

		doc.section(name)

		// Set class tags as meta data on the doc
		if (node.comment) this.visitClassComment(node.comment, doc)

		if (isNodeOpaque(node)) return
	}

	private visitClassComment(comment: CommentObject, doc: APIDocument) {
		writeComment(doc, comment)

		if (!comment.tags) return
		let meta: any = {}
		comment.tags.forEach(tag => {
			meta[tag.tag] = tag.text.trim()

			if (tag.tag === 'class') {
				// Automatically name file after class name
				meta.title = tag.text.trim()
			}
		})

		doc.frontmatter(meta)
	}

	private visitAlias(node: NodeLike, doc: APIDocument) {
		debug(`Visit '${node.kindString}' ${node.name}`)

		this.addReference(node.name, doc)

		doc.block(b => {
			b.h2(c => {
				c.inlineCode(node.name)
			})
		})

		writeComment(doc, node.comment)

		// @ts-ignore
		console.log(node.type.type)
	}
	private visitExternalModule(node: NodeLike) {
		debug(`Visit '${node.kindString}' ${node.name}`)
	}

	private visitEnumerationMember(node: NodeLike, doc: APIDocument) {
		debug(`Visit '${node.kindString}' ${node.name}`)
	}
	private visitObjectLiteral(node: NodeLike, doc: APIDocument) {
		debug(`Visit '${node.kindString}' ${node.name}`)
		this.addReference(node.name, doc)

		doc.block(b => b.h1(c => c.inlineCode(node.name)))
		writeComment(doc, node.comment)

		// throw new Error(`TBD`)
		// this.processObject(doc, node.name, node.children)

		doc.block(b => {
			b.table(
				t => {
					t.row([node.name, 'Default Value', 'Comment'])

					if (node.children) {
						node.children.forEach((node: any) => {
							let { name, defaultValue, comment } = node
							t.row(c => {
								c.cell(c => c.inlineCode(name))
								c.cell(defaultValue || '')
								c.cell(c => c.p(commentToString(comment).trim()))
							})
						})
					}
				},
				['left', 'left', 'left'],
			)
		})

		// doc.writeTable([
		// 	[thing, 'Default Value', 'Comment'],
		// 	...members.map(node => {
		// 		let { name, defaultValue } = node
		// 		let comment = commentFromNode(node)
		// 		return [`\`${name}\``, defaultValue ? defaultValue : '', comment ? comment : '']
		// 	}),
		// ])
	}
	private visitProperty(node: NodeLike) {
		debug(`Visit '${node.kindString}' ${node.name}`)
	}
	private visitFunction(node: NodeLike, doc?: APIDocument) {
		// console.log(info(`Function ${node.name}`))
		if (isNodeInternal(node)) return

		this.visitMethod(node, doc)
	}
	private visitMethod(node: NodeLike, doc?: APIDocument) {
		if (isMethodReflection(node) && doc) {
			let implementationName = (node.implementationOf && node.implementationOf.name) || node.name
			if (isNodeInternal(node)) return

			if (isCallableNode(node)) {
				let [sig] = node.signatures
				if (sig) {
					this.addReference(sig.name, doc)

					let returnType = sig.type
					let params = this.visitCallSignature(sig)

					// if (node.name === 'bindBrowser') {
					// 	debugger
					// }

					doc.callSignature(implementationName, params)

					writeComment(doc, node.comment)
					writeComment(doc, sig.comment)

					doc.writeParameters(params, returnType)

					// if (node.implementationOf) this.referenceMap.set(node.implementationOf.name, 'TODO')
				}
			}
		}
	}

	private visitCallSignature(signature: CallSignatureType): CallSignatureWriteParam[] {
		if (!signature.parameters) return []
		let { parameters } = signature

		let params = parameters
			.map(param => {
				let {
					name,
					type,
					flags: { isOptional = false, isExported, isPublic, isStatic },
					defaultValue,
					comment,
				} = param
				let isReference = type.type === 'reference'
				let { shortText, text } = comment || { shortText: null, text: null }

				let desc = [shortText, text]
					.filter(Boolean)
					.map(fixReferences)
					.join(`\n`)

				return { name, type, isOptional, isReference, defaultValue, desc, isPublic, isStatic }
			})
			.filter(param => param.isPublic !== false)
		return params
	}

	private visitVariable(node: NodeLike, doc: APIDocument) {
		debug(`Visit '${node.kindString}' ${node.name}`)
		this.addReference(node.name, doc)

		doc.section(node.name)
		writeComment(doc, node.comment)
	}

	/**
	 * Stores a reference to a variable, method, or class to a document name which can be used
	 * later to assign a reference definition in Markdown.
	 *
	 * @private
	 * @param {string} name
	 * @param {(APIDocument | string)} target
	 * @memberof Parser
	 */
	private addReference(name: string, target: APIDocument | string) {
		if (target instanceof APIDocument) {
			let entry = [...this.documents.entries()].find(([path, doc]) => doc === target)
			if (!entry) {
				debug(`Missing document for reference ${name}`)
				return
			}
			target = entry[0]
		}

		debug(`addReference ${name} -> ${target}`)
		this.references.set(name, target)
	}

	private documentForName(name: string): APIDocument | null {
		let key = this.index.indexExports[name]
		return this.documents.get(key) || null
	}
}
