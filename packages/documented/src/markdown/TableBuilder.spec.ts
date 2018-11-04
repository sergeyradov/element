import 'mocha'
import { expect } from 'chai'
import { Document } from './Document'

describe.only('Table builder', () => {
	let doc: Document
	beforeEach(async () => {
		doc = new Document()
	})

	it('table row with text array', async () => {
		doc.block(b => {
			b.table(t => {
				t.row(['foo', 'bar'])
				t.row(['foo1', 'bar1'])
				t.row(['foo2', 'bar2'])
			})
		})

		expect(doc.toMarkdown()).to.equal(
			`
| foo  | bar  |
| ---- | ---- |
| foo1 | bar1 |
| foo2 | bar2 |
`.trimLeft(),
		)
	})

	it('table row with phrasing content', async () => {
		doc.block(b => {
			b.table(t => {
				t.row(c => {
					c.cell(c => c.inlineCode('Code Example'))
					c.cell(c => c.strong('Strong'))
				})
				t.row(['foo1', 'bar1'])
				t.row(['foo2', 'bar2'])
			})
		})

		expect(doc.toMarkdown()).to.equal(
			`
| \`Code Example\` | **Strong** |
| -------------- | ---------- |
| foo1           | bar1       |
| foo2           | bar2       |
`.trimLeft(),
		)
	})

	it('table header with alignment', async () => {
		doc.block(b => {
			b.table(
				t => {
					t.row(c => {
						c.cell(c => c.emphasis('Code Example'))
						c.cell(c => c.strong('Strong'))
					})
					t.row(['foo1', 'bar1'])
					t.row(['foo2', 'bar2'])
				},
				['center', 'right'],
			)
		})

		expect(doc.toMarkdown()).to.equal(
			`
| _Code Example_ | **Strong** |
| :------------: | ---------: |
|      foo1      |       bar1 |
|      foo2      |       bar2 |
`.trimLeft(),
		)
	})
})
