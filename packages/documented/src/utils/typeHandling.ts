import { ParamType, ReflectedDeclaration, Variable, CallSignature } from '../types'

export function typeToString(input: ParamType): string | never {
	let { type } = input

	switch (input.type) {
		case 'intrinsic':
			return `${input.name}`
		case 'stringLiteral':
			return `"${input.value}"`
		case 'array':
			return `${typeToString(input.elementType)}\\[]`
		case 'union':
			return `${input.types.map(typeToString).join(' | ')}`
		case 'reflection':
			return reflectedDeclarationToAny(input.declaration).toString()
		case 'reference':
			if (input.name === 'Promise') {
				let formattedArgs = (input.typeArguments || []).map(typeToString)
				return `[Promise]<${formattedArgs.join(' | ')}>`
			} else {
				return `<[${input.name}]>`
			}
		default:
			console.assert(true, `Found unknown type: "${type}"`)
	}
	return 'void'
}

function reflectedDeclarationToAny(
	declaration: ReflectedDeclaration | Variable | CallSignature,
): any {
	switch (declaration.kindString) {
		case 'Type literal':
			if (declaration.children) {
				let children = declaration.children.map(reflectedDeclarationToAny).reduce((memo, obj) => {
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
