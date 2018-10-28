import { major, minor } from 'semver'

export const getVersion = (pkgPath: string): string => {
	let pkg = require(pkgPath)
	let { version } = pkg
	return [major(version).toString(), minor(version).toString()].join('.')
}
