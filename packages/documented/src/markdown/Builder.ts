import { Parent } from 'unist'
export class Builder {
	constructor(public tree: Parent) {}

	public get children() {
		return this.tree.children
	}
}
