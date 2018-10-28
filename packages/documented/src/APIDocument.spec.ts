import 'mocha'
import { expect } from 'chai'
import { APIDocument } from './APIDocument'

describe('APIDocument', () => {
	let doc: APIDocument
	beforeEach(async () => {
		doc = new APIDocument()
	})

	it('comment', async () => {
		doc.comment('This is an example\n\n```typescript\nCode block\n```\n')
		expect(doc.toMarkdown()).to.equal('This is an example\n\n```typescript\nCode block\n```\n')
	})
})
