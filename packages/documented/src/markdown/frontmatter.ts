const frontmatterCompile = require('remark-frontmatter/lib/compile')
const matters = require('remark-frontmatter/lib/matters')

export function attachFrontmatterCompiler(compiler) {
	let matterConfig = matters(['yaml'])
	let { visitors } = compiler.__proto__

	compiler.__proto__.visitors = {
		...wrap(frontmatterCompile, matterConfig),
		...visitors,
	}
}

function wrap(func, matters) {
	var result = {}
	var length = matters.length
	var index = -1
	var tuple

	while (++index < length) {
		tuple = func(matters[index])
		result[tuple[0]] = tuple[1]
	}

	return result
}
