import * as u from 'unist-builder'
import { Parent } from 'unist'
import { Markdown } from '../../markdown'

export type ContentBuilderFn = (c: PhrasingContentBuilder) => void

export class PhrasingContentBuilder {
	constructor(private tree: Parent) {}

	public p(value?: string | ContentBuilderFn) {
		if (!value) value = ''
		this.phrasingContent('paragraph', value)
	}

	public strong(value: string | ContentBuilderFn) {
		this.phrasingContent('strong', value)
	}

	public emphasis(value: string | ContentBuilderFn) {
		this.phrasingContent('emphasis', value)
	}

	public delete(value: string | ContentBuilderFn) {
		this.phrasingContent('delete', value)
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

	/**
	 * Generates a reference to a footnote
	 */
	public footRef(identifier: string, label?: string) {
		if (!label) label = identifier
		let ref = u('footnoteReference', { identifier, label })
		this.tree.children.push(ref)
	}

	public linkRef(
		label: string,
		value?: string | ContentBuilderFn,
		options: { referenceType?: Markdown.ReferenceType } = {},
	) {
		let identifier = label
		let tree = u('linkReference', { label, identifier, ...options }, [])

		let builder = new PhrasingContentBuilder(tree)
		if (typeof value === 'string') {
			builder.p(value)
		} else if (typeof value === 'function') {
			value(builder)
		} else {
			builder.p(label)
		}

		this.tree.children.push(tree)
	}

	private phrasingContent(type: string, value: string | ContentBuilderFn) {
		if (typeof value === 'function') {
			let tree = u(type, [])
			let builder = new PhrasingContentBuilder(tree)
			value(builder)
			this.tree.children.push(tree)
		} else {
			this.tree.children.push(u(type, {}, [u('text', value)]))
		}
	}

	private literalContent(type: string, value: string) {
		this.tree.children.push(u(type, { value }))
	}

	public get children() {
		return this.tree
	}
}
