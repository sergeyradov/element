import { Document } from './markdown/Document'
import { ParamType } from './types'
import { typeToString } from './utils/typeHandling'

export class APIDocument extends Document {
	section(title: string) {
		this.block(b => {
			b.h1(title)
		})
	}

	parameter(
		name: string,
		type: ParamType,
		desc: string = '',
		isOptional: boolean = false,
		defaultValue?: any,
	) {
		let formattedType = typeToString(type)
		this.block(b => {
			b.list(list => {
				if (name.startsWith('returns')) {
					list.item(b => {
						b.p(c => {
							c.p(`${name} `)
							c.ref(formattedType)
							c.p(' ')
							if (desc) c.p(desc)
						})
					})
				} else {
					list.item(b => {
						b.p(c => {
							c.p(`${name} `)
							c.ref(formattedType)
							c.p(' ')
							if (defaultValue !== undefined) {
								c.p('(Optional, default: ')
								c.inlineCode(defaultValue.toString())
								c.p(')')
							} else if (isOptional) {
								b.p('(Optional)')
							}

							if (desc) b.p(desc)
						})
					})
				}
			})
		})
	}

	comment(...parts: string[]) {
		this.block(b => {
			parts.forEach(text => b.p(text))
		})
	}
}
