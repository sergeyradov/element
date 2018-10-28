import { info, param } from './utils/out'
import { APIDocument } from './APIDocument'

interface Section {}

interface TreeLike {
	children?: NodeLike[]
}

interface NodeLike {
	name: string
	kindString?: string

	children?: NodeLike[]
}

function stripQuotes(name: string): string {
	if (name.startsWith('"') && name.endsWith('"')) {
		return name.slice(1, name.length - 1)
	} else {
		return name
	}
}

class Context {
	constructor(public mod: string, public docSource: Parser) {}

	forMod(mod: string): Context {
		return new Context(stripQuotes(mod), this.docSource)
	}

	docForKey(key: string): APIDocument {
		const fullKey = `${this.mod}.${key}`
		const pageName = indexMap[fullKey]
		debug('fullKey %s pageName %s', fullKey, pageName)

		if (pageName === undefined) return this.docSource.catchallDoc

		const path = `api/${pageName}.md`

		return this.docSource.getDoc(path)
	}
}

export class Parser {
	sections: Map<string, Section>

	visitors = {
		Variable: this.visitVariable,
	}

	constructor(private typeDoc: NodeLike) {
		this.walk(typeDoc)
	}

	walk(node: NodeLike) {
		const { name, kindString } = node

		// console.log(`${info(kindString)} ${param(name)}`)
		this.visit(node)

		if (node.children)
			node.children.forEach(node => {
				this.walk(node)
			})
	}

	visit(node: NodeLike) {
		if (node.kindString) {
			let visitor = this.visitors[node.kindString]
			if (visitor) {
				visitor(node)
			} else {
				console.log(info(`TODO: ${node.kindString}`))
			}
		}
	}

	private visitVariable(node: NodeLike) {
		console.dir(node, { depth: null })
	}

	private processNode(node: NodeLike) {}
}
