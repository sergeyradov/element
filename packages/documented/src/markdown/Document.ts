import { Compiler } from 'remark-stringify'
import * as u from 'unist-builder'
import { Markdown } from '../../../documented/markdown'
import * as yaml from 'js-yaml'
import { BlockContentBuilder } from './BlockContentBuilder'
import { DefinitionBuilder } from './DefinitionBuilder'
import { attachFrontmatterCompiler } from './frontmatter'
const unified = require('unified')
const parse = require('remark-parse')
const frontmatter = require('remark-frontmatter')
const visit = require('unist-util-visit-parents')

export class Document {
	private compiler: Compiler
	protected tree: Markdown.Root

	private middlewares: ((root: Markdown.Root) => Markdown.Root)[]

	constructor() {
		this.middlewares = []
		this.tree = u('root', [])
	}

	public use(plugin): this {
		this.middlewares.push(plugin)
		return this
	}

	public block(builder: (builder: BlockContentBuilder) => void) {
		let block = new BlockContentBuilder(this.tree)
		builder(block)
	}

	public definition(builder: (b: DefinitionBuilder) => void) {
		let block = new DefinitionBuilder(this.tree)
		builder(block)
	}

	public frontmatter(data: { [key: string]: object | string | number | boolean | null }) {
		if (this.tree.children[0] && this.tree.children[0].type === 'yaml') {
			let yamlNode = this.tree.children.shift()
			if (yamlNode) {
				let existingData = yamlNode.data
				data = { ...existingData, ...data }
			}
		}

		this.tree.children = [u('yaml', yaml.safeDump(data)), ...this.tree.children]
	}

	public raw(text: string) {
		let tree = unified()
			.use(parse)
			.parse(text)

		this.tree.children.push(...tree.children)
	}

	public get definitions(): Markdown.Definition[] {
		let refs: Map<string, Markdown.Definition> = new Map()
		visit(this.tree, 'definition', (node: Markdown.Definition) => refs.set(node.identifier, node))
		return [...refs.values()]
	}

	public get references(): Markdown.LinkReference[] {
		let refs: Map<string, Markdown.LinkReference> = new Map()
		visit(this.tree, 'linkReference', (node: Markdown.LinkReference) =>
			refs.set(node.identifier, node),
		)
		return [...refs.values()]
	}

	public get orphanedReferences() {
		let defs = this.definitions.map(def => def.identifier)
		return this.references.filter(ref => !defs.includes(ref.identifier))
	}

	public toMarkdown() {
		let lastRoot = this.tree
		this.middlewares.forEach(fn => {
			lastRoot = fn(lastRoot)
		})

		this.compiler = new Compiler(lastRoot, { entities: false, gfm: true })
		attachFrontmatterCompiler(this.compiler)

		return this.compiler.compile()
	}
}
