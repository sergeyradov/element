const chalk = require('chalk')
import { APIDocument } from './src/APIDocument'

async function main() {
	console.log(chalk.grey('Starting documentation generator'))

	// 	var tree = unified()
	// 		.use(parse)
	// 		.use(frontmatter).parse(`---
	// title: Test doc
	// ---

	// # test
	// `)

	let doc = new APIDocument()
	// doc.use(abbr)

	doc.frontmatter({ title: 'Test' })
	doc.section('Browser')
	doc.comment('This is the first line', 'THis is the second line')
	doc.parameter(
		'name',
		{ type: 'array', elementType: { type: 'stringLiteral', value: 'test' } },
		'This is a description',
		true,
		true,
	)

	doc.definition(b => {
		b.footnote('note1', 'First note', c => {
			c.h1('Test')
			c.p('text value')
		})
	})

	// debugger
	console.log(doc.toMarkdown())
}

main()
