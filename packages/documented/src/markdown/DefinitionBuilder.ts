import * as u from 'unist-builder'
import { Parent } from 'unist'
import { BlockContentBuilder } from './Builder'

export type DeffinitionBuilderFn = (c: DefinitionBuilder) => void

export class DefinitionBuilder {
	constructor(private tree: Parent) {}

	public definition(identifier: string, label: string, url: string, title?: string) {
		this.tree.children.push(u('definition', { label, identifier, url, title }))
	}

	public footnote(identifier: string, label: string, content: (b: BlockContentBuilder) => void) {
		let tree = u('footnoteDefinition', { identifier, label }, [])
		let builder = new BlockContentBuilder(tree)
		content(builder)
		this.tree.children.push(tree)
	}
}
