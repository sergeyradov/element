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
			if (name.startsWith('returns')) {
				b.p(`* ${name} <${formattedType}> ${desc}`)
			} else {
				let defaultValueString = ''
				if (defaultValue !== undefined) {
					defaultValueString = `(Optional, default: \`${defaultValue.toString()})\``
				} else if (isOptional) {
					defaultValueString = '(Optional)'
				}

				b.p(`* \`${name}\` <${formattedType}>  ${defaultValueString} ${desc}`)
			}
		})
	}

	comment(...parts: string[]) {
		this.block(b => {
			parts.forEach(text => b.p(text))
		})
	}
}
