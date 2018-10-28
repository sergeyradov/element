import * as slug from 'slug'

export function generateAnchor(name: string): string {
	return slug(name, { lower: true, symbols: true })

	// return name
	// 	.toLowerCase()
	// 	.replace(/\s+/gi, '-')
	// 	.replace(/[^a-z0-9-_]/gi, '')
}
