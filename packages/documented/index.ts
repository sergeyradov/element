const chalk = require('chalk')
import { APIDocument } from './src/APIDocument'
import { join, resolve } from 'path'
import { Parser } from './src/Parser'
import { Compiler } from './src/Compiler'
import { promises as fs } from 'fs'
import { mkdirpSync } from 'fs-extra'
import { getVersion } from './src/utils/getVersion'
import { info } from './src/utils/out'

async function main(workspace: string) {
	console.log(chalk.grey('Starting documentation generator'))

	let version = getVersion(resolve(join(workspace, 'package.json')))
	let destination = join(workspace, 'docs', 'api', version)
	let indexTSPath = join(workspace, 'index.ts')

	mkdirpSync(destination)

	let typeDocFile = await fs
		.readFile(join(workspace, 'docs.json'))
		.then(file => file.toString('utf8'))

	let parser = new Parser(destination, JSON.parse(typeDocFile), indexTSPath)
	let documents = await parser.parse()

	documents.forEach((doc, name) => {
		let filename = join(destination, `${name}.md`)
		console.log(info(`Writing ${filename}`))
		fs.writeFile(filename, Buffer.from(doc.toMarkdown()))
	})

	console.dir(parser.references, { depth: null })
}

main(process.argv[2])
