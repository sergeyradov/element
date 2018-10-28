import * as u from 'unist-builder'
import { Parent } from 'unist'
import { BlockContentBuilder } from './BlockContentBuilder'

export type DeffinitionBuilderFn = (c: DefinitionBuilder) => void

export class DefinitionBuilder {
	constructor(private tree: Parent) {}

	public definition(label: string, url: string, title?: string) {
		let identifier = label
		this.tree.children.push(u('definition', { identifier, label, url, title }))
	}

	public footnote(label: string, content: (b: BlockContentBuilder) => void) {
		let identifier = label
		let tree = u('footnoteDefinition', { identifier, label }, [])
		let builder = new BlockContentBuilder(tree)
		content(builder)
		this.tree.children.push(tree)
	}
}
