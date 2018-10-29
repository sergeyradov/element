import { Parent, Node } from 'unist'
// import { MarkdownBuilder } from './scripts/docs/MarkdownBuilder';

declare namespace Markdown {
	type Root = Parent & {
		type: 'root'
	}

	type UnistLiteral = Node & {
		value: any
	}

	type Literal = UnistLiteral & {
		value: string
	}

	type Text = Literal & {
		type: 'text'
	}

	type Emphasis = Parent & {
		type: 'emphasis'
		children: PhrasingContent[]
	}
	type Footnote = Parent & {
		type: 'footnote'
		children: PhrasingContent[]
	}

	type Strong = Parent & {
		type: 'strong'
		children: PhrasingContent[]
	}
	type Delete = Parent & {
		type: 'delete'
		children: PhrasingContent[]
	}

	type InlineCode = Literal & {
		type: 'inlineCode'
	}

	type HTML = Literal & {
		type: 'html'
	}
	type Break = Node & {
		type: 'break'
	}
	type Image = Node & {
		type: 'image'
	}
	type ImageReference = Node & {
		type: 'imageReference'
	}
	type FootnoteReference = Node & {
		type: 'footnoteReference'
	}

	type Link = Parent & {
		type: 'link'
		children: StaticPhrasingContent[]
	}

	type LinkReference = Parent &
		Reference &
		Association & {
			type: 'linkReference'
			children: StaticPhrasingContent[]
		}

	type Resource = {
		url: string
		title?: string
	}

	interface Association {
		identifier: string
		label?: string
	}

	type Reference = {
		referenceType: ReferenceType
	}

	type ReferenceType = 'full' | 'collapsed' | 'shortcut'

	type Definition = Association &
		Resource & {
			type: 'definition'
		}

	type StaticPhrasingContent =
		| Text
		| Emphasis
		| Strong
		| Delete
		| HTML
		| InlineCode
		| Break
		| Image
		| ImageReference
		| Footnote
		| FootnoteReference

	type PhrasingContent = StaticPhrasingContent | Link | LinkReference

	type ListItem = Parent & {
		type: 'listItem'
		checked?: boolean
		spread?: boolean
		// children: BlockContent[]
	}
}
