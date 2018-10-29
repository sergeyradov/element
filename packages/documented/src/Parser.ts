import { info, param } from './utils/out'
import { APIDocument } from './APIDocument'
import {
	createSourceFile,
	forEachChild,
	ScriptTarget,
	SyntaxKind,
	Node,
	JSDoc,
	NodeWithTypeArguments,
	isExportDeclaration,
	isVariableDeclaration,
	isVariableDeclarationList,
	isVariableStatement,
} from 'typescript'
import { promises as fs } from 'fs'

interface Section {}

interface TreeLike {
	children?: NodeLike[]
}

interface NodeLike {
	name: string
	kindString?: string

	children?: NodeLike[]
}

function stripQuotes(name: string): string {
	if (name.startsWith('"') && name.endsWith('"')) {
		return name.slice(1, name.length - 1)
	} else {
		return name
	}
}

class Context {
	constructor(public mod: string, public docSource: Parser) {}

	forMod(mod: string): Context {
		return new Context(stripQuotes(mod), this.docSource)
	}

	// docForKey(key: string): APIDocument {
	// 	const fullKey = `${this.mod}.${key}`
	// 	// const pageName = indexMap[fullKey]
	// 	// debug('fullKey %s pageName %s', fullKey, pageName)

	// 	// if (pageName === undefined) return this.docSource.catchallDoc

	// 	// const path = `api/${pageName}.md`

	// 	// return this.docSource.getDoc(path)
	// }
}

type NodeWithDoc = Node & {
	jsDoc: JSDoc[]
}

function isNodeWithJSDoc(node: Node): node is NodeWithDoc {
	if (typeof (node as NodeWithDoc).jsDoc !== 'undefined') return true
	return false
}

export type ParseIndex = {
	indexMap: { [key: string]: string }
	indexExports: { [key: string]: string }
}

export class Parser {
	sections: Map<string, Section>

	visitors = {
		Variable: this.visitVariable,
	}

	constructor(private typeDoc: NodeLike, private indexTS: string) {}

	public async parse() {
		await this.preParseIndex(this.indexTS)
		// this.walk(typeDoc)
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
			// debug('node', ts.Debug.showSyntaxKind(node))

			switch (node.kind) {
				case SyntaxKind.ExportDeclaration:
					if (isNodeWithJSDoc(node)) getExportDeclaration(ctx, node)
					break
				case SyntaxKind.VariableStatement:
					if (isNodeWithJSDoc(node)) getVariableExport(ctx, node)
					break
				default:

				// debug('unhandled sk', ts.SyntaxKind[node.kind])
				// debug('unhandled', node)
			}
		})

		console.dir(ctx, { depth: null })

		return ctx
	}

	walk(node: NodeLike) {
		const { name, kindString } = node

		// console.log(`${info(kindString)} ${param(name)}`)
		this.visit(node)

		if (node.children)
			node.children.forEach(node => {
				this.walk(node)
			})
	}

	visit(node: NodeLike) {
		if (node.kindString) {
			let visitor = this.visitors[node.kindString]
			if (visitor) {
				visitor(node)
			} else {
				console.log(info(`TODO: ${node.kindString}`))
			}
		}
	}

	private visitVariable(node: NodeLike) {
		console.dir(node, { depth: null })
	}

	private processNode(node: NodeLike) {}
}

const getTagsFromNode = (node: NodeWithDoc) => {
	let tagsMap = {}

	if (!node.jsDoc) return tagsMap
	let tags = node.jsDoc[0].tags

	if (!tags) return tagsMap

	for (const tag of tags) {
		tagsMap[tag.tagName.escapedText.toString()] = tag.comment || ''
	}

	return tagsMap
}

const getVariableExport = (ctx: ParseIndex, node: NodeWithDoc) => {
	const tags = getTagsFromNode(node)

	if (isVariableStatement(node)) {
		node.declarationList.declarations.forEach(decl => {
			const name = decl.name.getFullText()
			if (name === undefined) return

			addIndex(ctx, name, 'index', tags)
		})
	}
}

const getExportDeclaration = (ctx: ParseIndex, node: NodeWithDoc) => {
	const tags = getTagsFromNode(node)

	let src = node.getSourceFile().fileName
	if (src.startsWith('./')) src = src.slice(2)

	if (isExportDeclaration(node)) {
		node.exportClause &&
			node.exportClause.elements.forEach(exportDef => {
				const name = exportDef.name.escapedText.toString()
				addIndex(ctx, name, src, tags)
			})
	}
}

const addIndex = (ctx: ParseIndex, name: string, src: string, tags) => {
	if (!name) return
	const { docPage } = tags
	if (!docPage) return

	ctx.indexMap[`${src}.${name}`] = docPage
	ctx.indexExports[name] = docPage
	if (tags.docAlias && tags.docAlias[0] === name) {
		const aliasName = tags.docAlias[1]
		ctx.indexMap[`${src}.${aliasName}`] = docPage
		ctx.indexExports[aliasName] = docPage
	}
}
