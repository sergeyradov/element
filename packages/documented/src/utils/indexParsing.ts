import { isExportDeclaration, isVariableStatement } from 'typescript'

import { NodeWithDoc, ParseIndex } from '../Parser'
import { dirname, basename } from 'path'

export type TagsMap = {
	[key: string]: string
}

export const getTagsFromNode = (node: NodeWithDoc): TagsMap => {
	let tagsMap: TagsMap = {}

	if (!node.jsDoc) return tagsMap
	let tags = node.jsDoc[0].tags

	if (!tags) return tagsMap

	for (const tag of tags) {
		tagsMap[tag.tagName.escapedText.toString().trim()] = tag.comment || ''
	}

	return tagsMap
}

export const getVariableExport = (ctx: ParseIndex, node: NodeWithDoc) => {
	const tags = getTagsFromNode(node)

	if (isVariableStatement(node)) {
		node.declarationList.declarations.forEach(decl => {
			const name = decl.name.getFullText().trim()
			if (name === undefined) return

			addIndex(ctx, name, 'index', tags)
		})
	}
}

export const getExportDeclaration = (ctx: ParseIndex, node: NodeWithDoc) => {
	const tags = getTagsFromNode(node)

	let src = node.getSourceFile().fileName
	src = basename(src)

	if (isExportDeclaration(node)) {
		node.exportClause &&
			node.exportClause.elements.forEach(exportDef => {
				const name = exportDef.name.escapedText.toString()
				addIndex(ctx, name, src, tags)
			})
	}
}

export const addIndex = (ctx: ParseIndex, name: string, src: string, tags: TagsMap) => {
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
