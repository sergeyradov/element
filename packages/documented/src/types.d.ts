export type ParamType =
	| { type: 'intrinsic'; name: string }
	| { type: 'reference'; name: string | 'Promise'; typeArguments?: ParamType[] }
	| { type: 'stringLiteral'; value: string }
	| { type: 'reflection'; declaration: any }
	| { type: 'array'; elementType: ParamType }
	| { type: 'union'; types: ParamType[] }

type Variable = {
	id: string
	name: string
	kindString: 'Variable'
	flags: object
	type: ParamType
}
type CallSignature = {
	name: '__call'
	kindString: 'Call signature'
	type: ParamType
}
type ReflectedDeclaration = {
	name: '__type'
	kindString: 'Type literal'
	children?: Variable[]
	signatures?: CallSignature[]
}
