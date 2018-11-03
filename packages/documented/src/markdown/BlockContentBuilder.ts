import * as u from 'unist-builder'
import { Parent } from 'unist'
import { PhrasingContentBuilder, ContentBuilderFn } from './PhrasingContentBuilder'
import { Builder } from './Builder'
import { ListBuilder } from './ListBuilder'

export type BlockContentBuilderFn = (tree: BlockContentBuilder) => void
export class BlockContentBuilder extends Builder {
	public p(value: string | ContentBuilderFn) {
		let contentBuilder = new PhrasingContentBuilder(this.tree)
		contentBuilder.p(value)
	}

	public h1(value: string | ContentBuilderFn) {
		this.heading(value, 1)
	}

	public h2(value: string | ContentBuilderFn) {
		this.heading(value, 2)
	}

	public h3(value: string | ContentBuilderFn) {
		this.heading(value, 3)
	}

	public h4(value: string | ContentBuilderFn) {
		this.heading(value, 4)
	}

	public h5(value: string | ContentBuilderFn) {
		this.heading(value, 5)
	}
	public h6(value: string | ContentBuilderFn) {
		this.heading(value, 6)
	}

	private heading(content: string | ContentBuilderFn, depth: number = 1) {
		let block = u('heading', { depth }, [])
		let newBlock = new PhrasingContentBuilder(block)

		if (typeof content === 'string') {
			newBlock.p(content)
		} else {
			content(newBlock)
		}

		this.tree.children.push(newBlock.children)
	}

	public thematicBreak() {
		this.tree.children.push(u('thematicBreak', {}, []))
	}

	public blockquote(content: string | BlockContentBuilderFn) {
		let block = u('blockquote', [])
		let newBlock = new BlockContentBuilder(block)

		if (typeof content === 'string') {
			newBlock.p(content)
		} else {
			content(newBlock)
		}

		this.tree.children.push(newBlock.tree)
	}
	public list(
		fn: (builder: ListBuilder) => void,
		options: { ordered?: boolean; start?: number; spread?: boolean } = {},
	) {
		let tree = u('list', options, [])
		let newBlock = new ListBuilder(tree)
		fn(newBlock)
		this.tree.children.push(tree)
	}
	public table() {}
	public html() {}
	public code() {}
}
