import 'mocha'
import { expect } from 'chai'
import { Document } from './Document'

describe('Document builder', () => {
	let doc: Document
	beforeEach(async () => {
		doc = new Document()
	})

	it('p with text', async () => {
		doc.block(b => {
			b.p('hello world')
		})
		expect(doc.toMarkdown()).to.equal(`hello world\n`)
	})

	it('p with phrasing content', async () => {
		doc.block(b => {
			b.p(c => {
				c.p('Line 1 ')
				c.emphasis('Emphasised')
				c.p(' Normal ')
				c.strong('Strong')
			})
		})
		expect(doc.toMarkdown()).to.equal(`Line 1 _Emphasised_ Normal **Strong**\n`)
	})

	it('footnote definition', async () => {
		doc.definition(b => {
			b.footnote('note1', 'First note', c => {
				c.h1('Test')
				c.p('text value')
			})
		})

		expect(doc.toMarkdown()).to.equal(`[^First note]: # Test\n\n    text value\n`)
	})

	it('footnote reference', async () => {
		doc.block(b => {
			b.p(c => {
				c.p('Until contains a wealth of useful ')
				c.ref('Condition')
				c.p(`'s`)
			})
		})

		expect(doc.toMarkdown()).to.equal(`Until contains a wealth of useful [^Condition]\'s\n`)
	})

	it('list', async () => {
		doc.block(b => {
			b.list(
				list => {
					list.item('Item 1', { checked: true })
					list.item('Item 2', { checked: true })
					list.item('Item 3', { checked: false })
				},
				{ ordered: true },
			)
		})

		expect(doc.toMarkdown()).to.equal(`1.  [x] Item 1\n2.  [x] Item 2\n3.  [ ] Item 3\n`)
	})

	it('list with block content', async () => {
		doc.block(b => {
			b.list(list => {
				list.item(b => {
					b.blockquote('Quoted Item')
				})
				list.item(b => {
					b.h1('Heading item')
				})
			})
		})

		expect(doc.toMarkdown()).to.equal(`-   > Quoted Item\n-   # Heading item\n`)
	})
})
