import {
	NodeWithDoc,
	NodeLike,
	ClassReflection,
	MethodReflection,
	NodeWithCallSignature,
} from '../Parser'
import { Node } from 'typescript'
export function isNodeWithJSDoc(node: Node): node is NodeWithDoc {
	if (typeof (node as NodeWithDoc).jsDoc !== 'undefined') return true
	return false
}

export function isMethodReflection(node: NodeLike): node is MethodReflection {
	return (
		node.kindString === 'Method' ||
		node.kindString === 'Function' ||
		node.kindString === 'Expression'
	)

	// if (typeof (node as MethodReflection).implementationOf !== 'undefined') return true
	// return false
}

export function isClassReflection(node: NodeLike): node is ClassReflection {
	return node.kindString === 'Class'
}

export function isNodeOpaque(node: NodeLike) {
	if (node && node.comment && node.comment.tags) {
		return node.comment.tags.find(t => t && t.tag === 'docopaque')
	}
	return false
}

export const isCallableNode = (node: NodeLike): node is NodeWithCallSignature => {
	return node && !!(node as NodeWithCallSignature).signatures
}

export function isNodeInternal(node: NodeLike): boolean {
	if (node && node.comment && node.comment.tags) {
		let tags = node.comment && node.comment.tags
		return tags.some(t => t.tag === 'internal')
	} else if (isCallableNode(node)) {
		return node.signatures.some(isNodeInternal)
	}
	return false
}
