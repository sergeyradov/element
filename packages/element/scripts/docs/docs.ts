import { join, relative, resolve, isAbsolute } from 'path'
import { major, minor } from 'semver'
import * as camelcase from 'lodash.camelcase'
// import * as upperFirst from 'lodash.upperfirst'
// import * as glob from 'glob'
import { mkdirpSync, copySync, createFileSync, writeFileSync, readFileSync } from 'fs-extra'
// import * as frontMatter from 'front-matter'

import { preParseIndex } from './preParseIndex'
import { parsePuppeteer } from './puppeteer'
// import { generateAnchor } from './generateAnchor'
// import { MarkdownDocument, FrontMatter, Comment } from './MarkdownDocument'
import { typeToString } from './Formatters'

import * as debugFactory from 'debug'
import { Document } from './Document'
const debug = debugFactory('element:docs')

const repoRoot = join(__dirname, '../../../..')
const root = join(__dirname, '../..')

const generateAnchor = (name: string) =>
	name
		.toLowerCase()
		.replace(/\s+/gi, '-')
		.replace(/[^a-z0-9-_]/gi, '')

const writeComment = (doc: Document, comment: any) => {
	let { shortText, text } = comment || { shortText: null, text: null }
	doc.comment(shortText, text)
}

const commentToString = (comment: any): string => {
	let { shortText, text } = comment || { shortText: null, text: null }
	return [shortText, text].join('\n')
}

const getDocVersion = async (): Promise<string> => {
	let pkg = require('../../package.json')
	let { version } = pkg
	return [major(version).toString(), minor(version).toString()].join('.')
}

const { indexMap, indexExports } = preParseIndex(join(root, 'index.ts'))

const puppeteerJSON = parsePuppeteer()

debug('indexMap', indexMap)
debug('indexExports', indexExports)

function commentFromNode(node: any) {
	let { comment: { shortText, text } = { shortText: null, text: null } } = node
	return [shortText, text].filter(t => t && t.length).join('\n\n')
}
function isNodeInternal(node) {
	if (node && node.comment && node.comment.tags) {
		return node.comment.tags.find(t => t.tag === 'internal')
	} else if (node && node.signatures) {
		return node.signatures.some(isNodeInternal)
	}
	return false
}
function isNodeOpaque(node) {
	if (node && node.comment && node.comment.tags) {
		return node.comment.tags.find(t => t.tag === 'docopaque')
	}
	return false
}

function stripQuotes(name: string): string {
	if (name.startsWith('"') && name.endsWith('"')) {
		return name.slice(1, name.length - 1)
	} else {
		return name
	}
}

// function filePathForNameAndType(kind: string, name: string): string {
// const path = maybeFilePathForNameAndType(kind, name)
// if (path === undefined) {
// throw new Error(`unable to find file path for kind: ${kind}`)
// }
// return path
// }

// function exportKey(node): string {
// return `${stripQuotes(node.name)}.${node.name}`
// }
// }

class Context {
	constructor(public mod: string, public docSource: DocsParser) {}

	forMod(mod: string): Context {
		return new Context(stripQuotes(mod), this.docSource)
	}

	docForKey(key: string): Document {
		const fullKey = `${this.mod}.${key}`
		const pageName = indexMap[fullKey]
		debug('fullKey %s pageName %s', fullKey, pageName)

		if (pageName === undefined) return this.docSource.catchallDoc

		const path = `api/${pageName}.md`

		return this.docSource.getDoc(path)
	}
}

class DocsParser {
	public title: string

	public references: Map<string, { target: string; title?: string }> = new Map()
	public summaryParts: string[] = []
	// public enumerations: Document[] = []

	public docs: Map<string, Document> = new Map()
	public catchallDoc = Document.nullDoc()

	public bookDir: string
	constructor(public docsJSON: any, public puppeteerJSON: any) {}

	getDoc(pageName: string): Document {
		if (!this.docs.has(pageName)) {
			this.docs.set(pageName, new Document(pageName))
		}
		return this.docs.get(pageName) || this.catchallDoc
	}

	// seenModule: Map<string, boolean> = new Map()

	public puppeteerTypes: any

	private async init() {
		let version = await getDocVersion()
		console.log(`Preparing docs, version: ${version}`)
		this.bookDir = join(root, 'docs/api/', `${version}`)

		mkdirpSync(this.bookDir)

		debug('README', join(repoRoot, 'README.md'), join(this.bookDir, 'README.md'))
		copySync(join(repoRoot, 'README.md'), join(this.bookDir, 'README.md'))

		for (const [key, target] of Object.entries(externalRefs)) {
			this.addReference(key, target)
		}

		for (const [key, target] of Object.entries(indexExports)) {
			const path = `api/${target}.md`
			this.addReference(key, path)
			console.log('adding', key, path, `[${key}](${path}#${generateAnchor(key)})`)
			this.summaryParts.push(`[${key}](${path}#${generateAnchor(key)})`)
		}
	}

	/**
	 * This method processes the entire documentation AST and returns documentation.
	 *
	 * Steps:
	 * 1. Build Markdown documents for each "kind"
	 * 2. Create a reference list of each Kind and method/property linking to the file it belongs to.
	 * 3. Find all references mentioned in all markdown documents and append these references to those files.
	 *
	 * @memberof DocsParser
	 */
	async process() {
		await this.init()

		console.log('processing')
		this.docsJSON.children.forEach((child: any) => this.processTopLevelNode(child))

		const ctx = new Context('puppeteer', this)
		this.puppeteerJSON.forEach((child: any) => this.processNode(ctx, child)) //, this.puppeteerJSON)

		// console.log('creating summary')
		// this.createSummary()

		console.log('writing')
		this.writeDocsToFiles()

		// this.rewriteReadmePaths()
	}

	private processTopLevelNode(node: any) {
		debug('processTopLevelNode')
		const { name, kindString } = node

		debug('name: %s, kind: %s', name, kindString)
		// if (this.seenModule(node)) return

		const ctx = new Context('top', this)

		this.processNode(ctx, node)
	}

	private processNode(ctx: Context, node: any) {
		debug('processNode', node.kindString, node.name)
		if (isNodeInternal(node)) {
			return
		}

		switch (node.kindString) {
			case 'Module':
			case 'Enumeration':
			case 'Class':
			case 'Interface':
				this.processClass(ctx, node)
				break
			case 'Function':
				debug('found a function ', node.name)
				this.processFunction(ctx, node)
				break
			case 'Type alias':
				this.processAlias(ctx, node)
				break
			case 'External module':
				this.processExternalModule(ctx, node)
				break
			case 'Object literal':
				this.processObjectLiteral(ctx, node)
				break
			case 'Variable':
				this.processVariable(ctx, node)
				break
			default:
				console.warn(`unknown kind ${node.kindString} (${node.name})`)
				return
		}
	}

	// public applyReferencesToHandWrittenDocs() {
	// 	let files = glob.sync('docs/**/*.md')
	// 	files.forEach(path => {
	// 		let doc = MarkdownDocument.fromFile(path)
	// 		doc.applyReferences(this.references)
	// 		createFileSync(path)
	// 		writeFileSync(path, doc.toString())
	// 	})
	// }

	public writeDocsToFiles() {
		debug('writeDocsToFiles()')
		// this.applyReferencesToHandWrittenDocs()
		let contents: Map<string, string[]> = new Map()
		// debug('docs', this.docs)
		this.docs.forEach((doc, path) => {
			if (!doc.shouldWrite) return

			// doc.applyReferences(this.references)

			let absPath = join(this.bookDir, path)
			if (!contents.has(absPath)) contents.set(absPath, [])

			const content = contents.get(absPath)
			if (content) content.push(doc.toMarkdown())
		})
		contents.forEach((content, absPath) => {
			createFileSync(absPath)
			writeFileSync(absPath, content.join('\n'))
			console.log(`-> ${absPath}`)
		})
	}

	private addReference(name: string, pathOrDoc: Document | string) {
		let target: string
		if (typeof pathOrDoc === 'string') {
			target = pathOrDoc
		} else if ((pathOrDoc as Document).path !== undefined) {
			target = (pathOrDoc as Document).path
		} else {
			return
		}

		debug('addReference', name, target)
		this.references.set(name, { target })
	}

	// private createSummary() {
	// 	const doc = this.getDoc('SUMMARY.md')
	// 	// const doc = this.getDoc(new MarkdownDocument('SUMMARY.md')
	// 	doc.enableReferences = false
	// 	doc.writeHeading('Documentation', 2)
	// 	doc.writeLine('')
	// 	doc.writeBullet('[Quick Start](README.md)')

	// 	// Adds everything in the examples directory
	// 	let examples = glob.sync('docs/examples/**/*.md')
	// 	examples.forEach(file => {
	// 		let content = readFileSync(file).toString('utf8')
	// 		let { title } = frontMatter<FrontMatter>(content).attributes
	// 		if (title) {
	// 			let relativePath = relative(this.bookDir, file)
	// 			doc.writeBullet(`[${title}](${relativePath})`)
	// 		}
	// 	})

	// 	doc.writeLine('')

	// 	doc.writeHeading('Flood Chrome API', 2)
	// 	doc.writeLine('')

	// 	// let sortedMethods: string[] = this.summaryParts

	// 	// debug('createSummary %O', this.summaryParts)
	// 	// this.summaryParts.forEach((links, name) => {
	// 	// links.forEach(m => {
	// 	// sortedMethods.push(m)
	// 	// })
	// 	// })

	// 	this.summaryParts
	// 		.sort()
	// 		// .sort((a, b) => a.toLowerCase() - b.toLowerCase())
	// 		.forEach(m => {
	// 			doc.writeBullet(m, 2)
	// 		})

	// 	// this.docs.set('Index', doc)

	// 	// doc = new MarkdownDocument('Enumerations.md')
	// 	// doc.writeHeading('Enumerations')
	// 	// doc.writeLine(
	// 	// 'Here you will find a list of all the possible values for fields which accept a typed enumerated property, such as `userAgent` or `click()`',
	// 	// )
	// 	// const enumDoc = this.docs.get('Enumeration')
	// 	// if (enumDoc) enumDoc.unshift(doc)
	// }

	private processCallSignature(doc: Document, sig: any, prefix?: string) {
		let { name, type, parameters = [] } = sig

		if (prefix) name = `${prefix}.${name}`

		// let params: any[] = []
		// parameters.forEach(p => {
		// 	let {
		// 		name,
		// 		type,
		// 		flags: { isOptional = false },
		// 		defaultValue,
		// 	} = p
		// 	let desc = commentFromNode(p)
		// 	params.push({ name, desc, type, isOptional, defaultValue })
		// })

		let params: any[] = parameters
			.map((param: any) => {
				let {
					name,
					type,
					flags: { isOptional = false, isPublic, isStatic },
					defaultValue,
					comment,
				} = param
				let isReference = type.type === 'reference'
				let { shortText, text } = comment || { shortText: null, text: null }

				let desc = [shortText, text]
					.filter(Boolean)
					// .map(fixReferences)
					.join(`\n`)

				return { name, type, isOptional, isReference, defaultValue, desc, isPublic, isStatic }
			})
			.filter((param: any) => param.isPublic !== false)

		// let required = params
		// 	.filter(p => !p.isOptional)
		// 	.map(p => p.name)
		// 	.join(`, `)
		// let optional = params
		// 	.filter(p => p.isOptional)
		// 	.map(p => p.name)
		// 	.join(`, `)

		doc.callSignature(name, params)

		writeComment(doc, sig.comment)

		doc.writeParameters(params, type)

		// name = `\`${name}(${required}${optional.length ? `[, ${optional}]` : ''})\``
		// this.writeCallSignature(doc, name, sig.comment, params, type)
	}

	// private writeCallSignature(
	// 	doc: Document,
	// 	name: string,
	// 	comment: Comment,
	// 	params: {
	// 		name: string
	// 		type: ParamType
	// 		desc?: string
	// 		isReference: boolean
	// 		isOptional: boolean
	// 		defaultValue: any
	// 	}[],
	// 	returnType?: any,
	// ) {
	// 	doc.block(b => b.h3(name))
	// 	// doc.h3(`${name}`, 4)

	// 	doc.writeParameters(params, returnType)

	// 	// params.forEach(param => {
	// 	// 	if (param.name && param.type)
	// 	// 		doc.writeParameterLine(
	// 	// 			param.name,
	// 	// 			param.type,
	// 	// 			param.desc,
	// 	// 			param.isOptional,
	// 	// 			param.defaultValue,
	// 	// 		)
	// 	// })

	// 	if (returnType) doc.writeParameterLine('returns:', returnType)

	// 	// doc.writeLine()

	// 	doc.comment(comment)
	// }

	private processFunction(ctx: Context, node: any) {
		const doc = ctx.docForKey(node.name)

		node.signatures.forEach(sig => {
			this.addReference(
				sig.name,
				doc,
				// '', // TODO
				// `${join(bookDir, filePathForNameAndType('Function', node.name))}#${generateAnchor(
				// sig.name,
				// )}`,
			)
			this.processCallSignature(doc, sig)
		})
	}

	private processAlias(ctx: Context, node: any) {
		debug('processAlias', node.name, ctx.mod, node)
		const doc = ctx.docForKey(node.name)

		doc.block(b => b.h2(c => c.inlineCode(node.name)))
		writeComment(doc, node.comment)

		this.addReference(node.name, doc)

		// console.dir(node, { depth: null })
		// const f = new ReflectedDeclarationFormatter(node)
		// debug('f', f.toString())

		switch (node.type.type) {
			// case 'reflection':
			// debug('sigs %O', node.type.declaration.signatures)
			// if (node.type.declaration.signatures) {
			// node.type.declaration.signatures.forEach(sig => {
			// // this.addReference(sig.name, join(bookDir, filePathForNameAndType('Type alias', node.name)))
			// this.processCallSignature(doc, sig, null)
			// })
			// }
			// break
			case 'union':
				this.processAlias_union(doc, node)
				break
			default:
				debug('unknown type alias type', node.type.type)
		}

		// if (node.signatures) {
		// node.signatures.forEach(sig => {
		// // this.addReference(sig.name, join(bookDir, filePathForNameAndType('Type alias', node.name)))
		// this.processCallSignature(doc, sig, null)
		// })
		// }
	}

	private processAlias_union(doc: Document, node: any) {
		debug('processAlias_union', node.name)
		debug(node.type, typeToString(node.type))

		doc.block(b => b.code(typeToString(node.type), 'typescript'))
	}

	private processObjectLiteral(ctx: Context, node: any) {
		debug('processObjectLiteral', node)
		const doc = ctx.docForKey(node.name)

		doc.block(b => b.h1(c => c.inlineCode(node.name)))
		writeComment(doc, node.comment)

		this.processObject(doc, node.name, node.children)
		this.addReference(node.name, doc)
	}

	private processVariable(ctx: Context, node: any) {
		debug('processVariable', node)
		const { name } = node

		const doc = ctx.docForKey(name)

		doc.block(b => b.h1(c => c.inlineCode(node.name)))
		writeComment(doc, node.comment)

		// 1. Create file and reference
		// doc.writeSection(`\`${name}\``)
		// doc.writeComment(node.comment)
		// doc.writeCodeBlock(typeToString(node.type))
	}

	private processExternalModule(ctx, node) {
		debug('processExternalModule', node)

		if (!node.children) {
			return
		}

		const modCtx = ctx.forMod(node.name)
		node.children.forEach(node => this.processNode(modCtx, node))
	}

	private processClass(ctx: Context, node: any) {
		let { name, children } = node
		debug('processClass', name, children)

		const doc = ctx.docForKey(name)

		// 1. Create file and reference

		doc.block(b => b.h1(c => c.inlineCode(name)))
		writeComment(doc, node.comment)

		if (isNodeOpaque(node)) return

		let meta: any = {}

		if (node.comment && node.comment.tags) {
			node.comment.tags.forEach((tag: any) => {
				meta[tag.tag] = tag.text.trim()

				if (tag.tag === 'class') {
					// Automatically name file after class name
					meta.title = tag.text.trim()
				}
			})

			doc.frontmatter(meta)
		}

		if (!children) children = []

		const methods = children.filter(node => node.kindString === 'Method')
		if (methods.length) {
			doc.block(b => b.p(c => c.strong('Methods')))
			methods.forEach(node => this.processClass_Method(doc, name, node))
		}

		const properties = children.filter(node => node.kindString === 'Property')
		if (properties.length) {
			// doc.writeHeading('properties', 4)
			doc.block(b => b.p(c => c.strong('Properties')))
			properties.forEach(node => this.processClass_Property(doc, name, node))
		}

		let members = children.filter(node => node.kindString === 'Enumeration member')
		if (members.length) {
			this.processObject(doc, name, members, 'Member')
		}

		// console.log(children.filter(node => !['Method', 'Property'].includes(node.kindString)))
	}

	private processClass_Method(doc: Document, parent: string, node: any) {
		if (isNodeInternal(node)) return

		node.signatures.forEach(sig => {
			this.processCallSignature(doc, sig, parent)
			if (doc.path) {
				let name = `${camelcase(parent)}.${sig.name}`
				this.addReference(name, doc)
			}
		})
	}

	private processClass_Property(doc: Document, parent: string, node: any) {
		debug('processClass_Property', parent, node.name, node)
		if (isNodeInternal(node)) return

		let { name, flags, type } = node
		let comment = commentFromNode(node)

		// comment rendered as part of an unordered list, so indent
		comment = '  ' + comment.replace(/\n/g, '  \n  ') + '  '

		doc.parameters([
			{
				name,
				type,
				desc: comment,
				isOptional: !!flags.isOptional,
				defaultValue: node.defaultValue,
			},
		])
		// doc.writeParameterLine(name, type, comment, !!flags.isOptional, node.defaultValue)
	}

	private processObject(doc: Document, parent: string, children: any[], thing = 'Name') {
		doc.block(b => {
			b.table(
				t => {
					t.row([parent, 'Default Value', 'Comment'])

					if (children) {
						children.forEach((node: any) => {
							let { name, defaultValue, comment } = node
							t.row(c => {
								c.cell(c => c.inlineCode(name))
								c.cell(defaultValue || '')
								c.cell(c => c.p(commentFromNode(node).trim()))
							})
						})
					}
				},
				['left', 'left', 'left'],
			)
		})
	}

	private rewriteReadmePaths() {
		const readmeFile = join(this.bookDir, 'README.md')
		let readme = readFileSync(readmeFile, 'utf8')

		const linkRe = /\[([^\]]+)?\]\(([^)]+)\)/g
		readme = searchAndReplace(
			readme,
			linkRe,
			(text: string | null, url: string): string | undefined => {
				if (!url.startsWith('http') && !url.startsWith('#') && !isAbsolute(url)) {
					const full = resolve(repoRoot, url)
					url = relative(this.bookDir, full)
					return `[${text}](./${url})`
				}
				return
			},
		)

		writeFileSync(readmeFile, readme, 'utf8')
	}
}

function searchAndReplace(
	input: string,
	re: RegExp,
	transformer: (...matches: string[]) => string | undefined,
): string {
	let match
	while ((match = re.exec(input)) !== null) {
		const [str, ...matches] = match

		const transformed = transformer(...matches)
		if (transformed !== undefined) {
			input = input.replace(str, transformed)
		}
	}
	return input
}

const externalRefs = {
	void: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void',
	null: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null',
	Array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
	boolean: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type',
	Buffer: 'https://nodejs.org/api/buffer.html#buffer_class_buffer',
	function:
		'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function',
	number: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type',
	Object: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object',
	Promise:
		'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
	RegExp: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp',
	string: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type',
	'stream.Readable': 'https://nodejs.org/api/stream.html#stream_class_stream_readable',
	Error: 'https://nodejs.org/api/errors.html#errors_class_error',
	ChildProcess: 'https://nodejs.org/api/child_process.html',
	iterator: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols',
	Element: 'https://developer.mozilla.org/en-US/docs/Web/API/element',
	Map: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map',
	selector: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors',
	'UIEvent.detail': 'https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail',
	Serializable:
		'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description',
	xpath: 'https://developer.mozilla.org/en-US/docs/Web/XPath',
	UnixTime: 'https://en.wikipedia.org/wiki/Unix_time',
	Key: 'Enumerations.md/#key',
	MouseButtons: 'Enumerations.md/#mousebuttons',
	Device: 'Enumerations.md/#device',
	TypeScript: 'https://www.typescriptlang.org/',
	Flood: 'https://flood.io',
}

const docsJSON = require(__dirname + '/../../docs.json')

const parser = new DocsParser(docsJSON, puppeteerJSON)
try {
	parser.process()
} catch (err) {
	console.error(err)
}
