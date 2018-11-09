import { Document } from './markdown/Document'
import { ParamType } from './types'
import { typeToString } from './utils/typeHandling'
import { TypeObject } from 'typedoc/dist/lib/serialization'
import { ContentBuilderFn, PhrasingContentBuilder } from './markdown/PhrasingContentBuilder'
import { CallSignatureWriteParam } from './Parser'

const ascending = (a, b) => (a.toString() || '').localeCompare(b.toString() || '')
export class APIDocument extends Document {
	private refMap: Map<string, string>
	constructor() {
		super()
		this.refMap = new Map()
	}

	addReference(name: string, value: string) {
		this.refMap.set(name, value)
	}

	intro(title: string, text: string) {
		this.frontmatter({ title })

		this.block(b => {
			b.h1(title)
			b.p(text)
		})
	}

	section(title: string) {
		this.block(b => {
			b.h1(title)
		})
	}

	parameters(
		params: {
			name: string
			type: TypeObject
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

						list.item(b => {
							if (name.startsWith('returns:')) {
								b.p(c => {
									c.text(`${name} `)
									this.formatType(type, c)
									if (desc) {
										c.text(' ')
										c.raw(desc.trim())
									}
								})
							} else {
								b.p(c => {
									isOptional ? c.text(`${name.trim()}? `) : c.text(`${name.trim()} `)

									this.formatType(type, c)
									c.p(' ')
									if (defaultValue !== undefined) {
										c.p('(Optional, default: ')
										c.inlineCode(defaultValue.toString().trim())
										c.p(')')
									} else if (isOptional) {
										c.p('(Optional)')
									}
									if (desc) {
										c.text(' ')
										c.raw(desc.trim())
									}
								})
							}
						})
					}
				})
			})
		})
	}

	formatType(type: TypeObject, c: PhrasingContentBuilder) {
		switch (type.type) {
			case 'intrinsic':
				c.inlineCode(type.name || 'undefined')
				break
			case 'stringLiteral':
				c.p(`"${type.value}"`)
				break
			case 'array':
				if (type.elementType) {
					// c.text('...')
					this.formatType(type.elementType, c)
					c.p('[]')
				} else {
					c.inlineCode('any[]')
				}
				break
			case 'union':
				if (type.types) {
					type.types.sort(ascending).forEach((type, index, types) => {
						if (type.name === 'undefined' && type.type === 'intrinsic') {
						} else {
							this.formatType(type, c)
							if (index < types.length - 1) c.p(' | ')
						}
					})
				} else {
					c.p('undefined')
				}
				break
			case 'reflection':
				if (type.declaration) console.dir(type)
				// return reflectedDeclarationToAny(type.declaration as ReflectedDeclaration).toString()
				break
			case 'reference':
				if (type.name === 'Promise') {
					c.linkRef('Promise', c => {
						c.p('Promise')
						c.p('<')
						if (type.typeArguments)
							type.typeArguments.forEach((arg, index, args) => {
								this.formatType(arg, c)
								if (index < args.length - 1) c.p(' | ')
							})
						c.p('>')
					})

					// return `[[Promise]<${formattedArgs.join(' | ')}>][Promise]`
				} else {
					if (type.name) {
						c.linkRef(type.name, c => {
							c.inlineCode(type.name || 'undefined')
						})
					}
				}
				break
			default:
				console.log(`Unknown type: ${type.name}`)
				c.inlineCode('void')
		}
	}

	comment(...parts: string[]) {
		this.block(b => {
			parts.forEach(text => this.raw(text))
		})
	}

	callSignature(methodName: string, params: CallSignatureWriteParam[]) {
		this.block(b => {
			// params.forEach(param => {
			let required = params
				.filter(p => !p.isOptional)
				.map(p => {
					if (
						p.type.type === 'array' &&
						p.type.elementType &&
						p.type.elementType.type === 'intrinsic'
					) {
						return `...${p.name}`
					} else {
						return p.name
					}
				})
				.join(`, `)
			let optional = params
				.filter(p => p.isOptional)
				.map(p => p.name)
				.join(`, `)

			let callSignatureString = `${methodName}(${required.length ? required : ''}${
				optional.length ? `[, ${optional}]` : ''
			})`

			b.p(c => {
				b.h3(c => {
					c.inlineCode(callSignatureString)
				})
			})

			// params.forEach(param => {
			// 	if (param.name && param.type) {
			// 		let { name, type, defaultValue, desc, isOptional, isReference } = param
			// 	}
			// })
			// this.parameter('returns:', returnType)
			// })
		})
	}

	public writeParameters(params, returnType?: any) {
		this.block(b => {
			b.p(c => c.strong('Parameters'))
			this.parameters([...params, { name: 'returns:', type: returnType }])
		})
	}
}
