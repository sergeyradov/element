import * as u from 'unist-builder'
import { Builder } from './Builder'
import { ContentBuilderFn, PhrasingContentBuilder } from './PhrasingContentBuilder'

export type TableAlignType = 'left' | 'right' | 'center' | null

export type TableBuilderFn = (tree: TableBuilder) => void
export type TableRowBuilderFn = (tree: TableRowBuilder) => void

export class TableBuilder extends Builder {
	row(cells: string | string[] | TableRowBuilderFn) {
		let tree = u('tableRow', {}, [])
		let builder = new TableRowBuilder(tree)

		if (typeof cells === 'string') {
			builder.cell(cells)
		} else if (Array.isArray(cells) && typeof cells[0] === 'string') {
			cells.forEach(text => {
				builder.cell(c => {
					c.text(text)
				})
			})
		} else if (typeof cells === 'function') {
			cells(builder)
		}

		this.tree.children.push(tree)
	}
}

export class TableRowBuilder extends Builder {
	cell(content: string | ContentBuilderFn) {
		let tree = u('tableCell', {}, [])
		let builder = new PhrasingContentBuilder(tree)

		if (typeof content === 'string') {
			builder.text(content)
		} else if (typeof content === 'function') {
			content(builder)
		}

		this.tree.children.push(tree)
	}
}
