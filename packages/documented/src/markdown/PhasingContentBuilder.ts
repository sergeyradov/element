import * as u from 'unist-builder'
import { Parent } from 'unist'

export type ContentBuilderFn = (c: PhasingContentBuilder) => void

export class PhasingContentBuilder {
	isBuilder = true

	constructor(private tree: Parent) {}

	public p(value?: string | ContentBuilderFn) {
		if (!value) value = ''
		this.phasingContent('paragraph', value)
	}

	public strong(value: string | ContentBuilderFn) {
		this.phasingContent('strong', value)
	}

	public emphasis(value: string | ContentBuilderFn) {
		this.phasingContent('emphasis', value)
	}

	public delete(value: string | ContentBuilderFn) {
		this.phasingContent('delete', value)
	}
	public html(value: string) {
		this.literalContent('html', value)
	}

	public inlineCode(value: string) {
		this.literalContent('inlineCode', value)
	}

	public image(url: string, alt: string, title?: string) {
		this.tree.children.push(u('image', { url, title, alt }))
	}

	public break() {
		this.tree.children.push(u('break'))
	}

	private phasingContent(type: string, value: string | ContentBuilderFn) {
		if (typeof value === 'function') {
			let tree = u(type, [])
			let builder = new PhasingContentBuilder(tree)
			value(builder)
			this.tree.children.push(tree)
		} else {
			this.tree.children.push(u(type, {}, [u('text', value)]))
		}
	}

	private literalContent(type: string, value: string) {
		this.tree.children.push(u(type, {}, [u('text', value)]))
	}

	public get children() {
		return this.tree
	}
}
