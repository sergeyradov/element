import { APIDocument } from '../../../documented/src/APIDocument'
import { readFileSync } from 'fs'
const unified = require('unified')
const parse = require('remark-parse')
const frontmatter = require('remark-frontmatter')
export class Document extends APIDocument {
	public shouldWrite = true
	constructor(
		public path: string,
		public referencesNeeded: string[] = [],
		public enableReferences = true,
		public frontMatter: object = {},
	) {
		super()
	}

	static nullDoc(): Document {
		const doc = new Document('')
		doc.shouldWrite = false
		return doc
	}

	static fromFile(path: string) {
		let doc = new Document(path)
		let content = readFileSync(path).toString('utf8')

		let tree = unified()
			.use(parse)
			.use(frontmatter)
			.parse(content)

		doc.tree = tree

		// let matter = frontMatter<FrontMatter>(content)
		// doc.frontMatter = matter.attributes

		// doc.addLines(matter.body.split('\n'))

		// doc.truncateFootnotes()
		// doc.referencesNeeded = findReferences(matter.body)

		return doc
	}

	public addLines(lines: string[]) {
		this.block(b => {
			lines.forEach(line => {
				b.p(line)
			})
		})
	}

	public writeCodeBlock(text: string, language = 'typescript') {
		this.block(b => b.code(text, language))
	}

	public writeHeading(text: string, depth: number = 1) {
		this.block(b => b.heading(text, depth))
	}
}
