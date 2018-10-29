const chalk = require('chalk')
import { APIDocument } from './src/APIDocument'
import { join, resolve } from 'path'
import { Parser } from './src/Parser'
import { Compiler } from './src/Compiler'
import { promises as fs } from 'fs'
import { mkdirpSync } from 'fs-extra'
import { getVersion } from './src/utils/getVersion'

async function main(workspace: string) {
	console.log(chalk.grey('Starting documentation generator'))

	let version = getVersion(resolve(join(workspace, 'package.json')))
	let destination = join(workspace, 'docs', 'api', version)
	let indexTSPath = join(workspace, 'index.ts')

	mkdirpSync(destination)

	let typeDocFile = await fs
		.readFile(join(workspace, 'docs.json'))
		.then(file => file.toString('utf8'))

	let parser = new Parser(JSON.parse(typeDocFile), indexTSPath)
	await parser.parse()

	let compiler = new Compiler(parser)
	compiler.compile(destination)

	// // 	var tree = unified()
	// // 		.use(parse)
	// // 		.use(frontmatter).parse(`---
	// // title: Test doc
	// // ---

	// // # test
	// // `)

	// let doc = new APIDocument()
	// // doc.use(abbr)

	// doc.frontmatter({ title: 'Test' })
	// doc.section('Browser')
	// doc.comment('This is the first line', 'THis is the second line')
	// doc.parameter(
	// 	'name',
	// 	{ type: 'array', elementType: { type: 'stringLiteral', value: 'test' } },
	// 	'This is a description',
	// 	true,
	// 	true,
	// )

	// doc.definition(b => {
	// 	b.footnote('note1', 'First note', c => {
	// 		c.h1('Test')
	// 		c.p('text value')
	// 	})
	// })

	// // debugger
	// console.log(doc.toMarkdown())
}

main(process.argv[2])
