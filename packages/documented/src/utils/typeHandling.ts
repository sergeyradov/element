import { ParamType, ReflectedDeclaration, Variable, CallSignature } from '../types'
import { TypeObject, ReflectionObject } from 'typedoc/dist/lib/serialization'

export function typeToString(type: TypeObject): string | never {
	switch (type.type) {
		case 'intrinsic':
			return type.name || 'undefined'
		case 'stringLiteral':
			return `"${type.value}"`
		case 'array':
			if (type.elementType) {
				return `${typeToString(type.elementType)}[]`
			} else {
				return `undefined[]`
			}
		case 'union':
			if (type.types) {
				return type.types.map(typeToString).join(' | ')
			} else {
				return 'undefined'
			}
		case 'reflection':
			if (type.declaration)
				return reflectedDeclarationToAny(type.declaration as ReflectedDeclaration).toString()
		case 'reference':
			if (type.name === 'Promise') {
				let formattedArgs = (type.typeArguments || []).map(typeToString)
				return `[[Promise]<${formattedArgs.join(' | ')}>][Promise]`
			} else {
				return `[${type.name}][${type.name}]`
			}
		default:
			console.assert(true, `Found unknown type: "${type}"`)
	}
	return 'void'
}

function reflectedDeclarationToAny(
	declaration: ReflectedDeclaration | Variable | CallSignature,
): string | object {
	switch (declaration.kindString) {
		case 'Type literal':
			if (declaration.children) {
				let children = declaration.children
					.map(reflectedDeclarationToAny)
					.reduce((memo: object, obj: object) => {
						memo = { ...obj, ...memo }
						return memo
					}, {})
				return JSON.stringify(children)
			}
			break
		case 'Variable':
			let { name, type } = declaration
			let formattedType = typeToString(type)
			let obj = {}
			obj[name] = formattedType
			return obj
	}

	return 'unknown reflection type'
}
