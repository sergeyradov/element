import { Document } from './markdown/Document'
import { ParamType } from './types'
import { typeToString } from './utils/typeHandling'
import { TypeObject } from 'typedoc/dist/lib/serialization'

export class APIDocument extends Document {
	private refMap: Map<string, string>
	constructor() {
		super()
		this.refMap = new Map()
	}

	addReference(name: string, value: string) {
		this.refMap.set(name, value)
	}

	section(title: string) {
		this.block(b => {
			b.h1(title)
		})
	}

	parameters(
		params: {
			name: string
			type: string
			desc?: string
			isOptional?: boolean
			defaultValue?: any
		}[],
	) {
		this.block(b => {
			b.list(list => {
				params.forEach(param => {
					if (param.name && param.type) {
						let { name, type, defaultValue, desc, isOptional } = param

						if (name.startsWith('returns')) {
							list.item(b => {
								b.p(c => {
									c.p(`${name} `)
									if (type) {
										c.linkRef(type.trim())
										c.p(' ')
									}
									if (desc) c.p(desc.trim())
								})
							})
						} else {
							list.item(b => {
								b.p(c => {
									c.p(`${name.trim()} `)
									c.linkRef(type.trim())
									c.p(' ')
									if (defaultValue !== undefined) {
										c.p('(Optional, default: ')
										c.inlineCode(defaultValue.toString().trim())
										c.p(')')
									} else if (isOptional) {
										b.p('(Optional)')
									}

									if (desc) b.p(desc.trim())
								})
							})
						}
					}
				})
			})
		})
	}

	comment(...parts: string[]) {
		this.block(b => {
			parts.forEach(text => this.raw(text))
		})
	}

	callSignature(
		params: {
			name: string
			type: string
			desc: string
			isReference: boolean
			isOptional: boolean
			defaultValue: any
		}[],
		returnType?: any,
	) {
		this.block(b => {
			params.forEach(param => {
				b.h3(param.name)

				this.parameters([...params, { name: 'returns:', type: returnType }])

				// params.forEach(param => {
				// 	if (param.name && param.type) {
				// 		let { name, type, defaultValue, desc, isOptional, isReference } = param
				// 	}
				// })
				// this.parameter('returns:', returnType)
			})
		})
	}
}
