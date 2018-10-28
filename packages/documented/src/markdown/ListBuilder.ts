import { Builder } from './Builder'
import * as u from 'unist-builder'
import { BlockContentBuilder, BlockContentBuilderFn } from './BlockContentBuilder'
export class ListBuilder extends Builder {
	item(
		content: string | BlockContentBuilderFn,
		options: { checked?: boolean; spread?: boolean } = {},
	) {
		if (typeof content === 'function') {
			let tree = u('listItem', options, [])
			let builder = new BlockContentBuilder(tree)
			content(builder)
			this.tree.children.push(tree)
		} else {
			this.tree.children.push(u('listItem', options, [u('text', content)]))
		}
	}
}
