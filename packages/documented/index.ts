const unified = require('unified')
const parse = require('remark-parse')
const frontmatter = require('remark-frontmatter')
const chalk = require('chalk')

import { Document } from './src/markdown/Document'

async function main() {
	console.log(chalk.grey('Starting documentation generator'))

	// 	var tree = unified()
	// 		.use(parse)
	// 		.use(frontmatter).parse(`---
	// title: Test doc
	// ---

	// # test
	// `)

	let doc = new Document()
	// doc.frontmatter({ title: 'Test' })

	doc.block(b => {
		b.h1('API Documentation')
		b.p(c => {
			c.p('Normal')
			c.strong('Strong content')
			c.break()
			c.image('myimage.png', 'Test')
			c.p()
		})
		b.blockquote(b => {
			b.h1('Warning')
			b.p('This is a blockquote with a heading')
			b.p(c => {
				c.delete('An old value')
			})
		})
	})

	console.log(doc.toMarkdown())
}

main()
