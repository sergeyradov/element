import * as u from 'unist-builder'
import { Parent } from 'unist'
import { PhrasingContentBuilder, ContentBuilderFn } from './PhrasingContentBuilder'

export class BlockContentBuilder {
	constructor(private tree: Parent) {}

	public p(value: string | ContentBuilderFn) {
		let contentBuilder = new PhrasingContentBuilder(this.tree)
		contentBuilder.p(value)
	}

	public h1(value: string) {
		this.heading(value, 1)
	}

	public h2(value: string) {
		this.heading(value, 2)
	}

	public h3(value: string) {
		this.heading(value, 3)
	}

	public h4(value: string) {
		this.heading(value, 4)
	}

	public h5(value: string) {
		this.heading(value, 5)
	}
	public h6(value: string) {
		this.heading(value, 6)
	}

	public heading(value: string, depth: number = 1) {
		this.tree.children.push(u('heading', { depth }, [u('text', value)]))
	}

	public thematicBreak() {
		this.tree.children.push(u('thematicBreak', {}, []))
	}
	public blockquote(buildFn: (tree: BlockContentBuilder) => void) {
		let block = u('blockquote', [])
		let newBlock = new BlockContentBuilder(block)
		buildFn(newBlock)
		this.tree.children.push(newBlock.tree)
	}
	public list(
		listBuilder: () => void,
		options: { ordered?: boolean; start?: number; spread?: boolean },
	) {}
	public table() {}
	public html() {}
	public code() {}

	public get children() {
		return this.tree
	}
}
