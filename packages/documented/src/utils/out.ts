// const { red } = require('chalk')

import chalk from 'chalk'

const tick = '✔'

export const error = (...messages: string[]) => {
	return `${chalk.red('> Error!')} ${messages.join('\n')}`
}

// export const log = (...messages: string[]) => {}

export const cmd = cmd => `${chalk.gray('`')}${chalk.bold(cmd)}${chalk.gray('`')}`
export const param = text => `${chalk.gray('"')}${chalk.bold(text)}${chalk.gray('"')}`

export const info = (...msgs) => `${chalk.gray('>')} ${msgs.join('\n')}`

export const ok = msg => `${chalk.cyan(tick)} ${msg}`

export const ready = msg => `${chalk.cyan('> Ready!')} ${msg}`

export const note = msg => `${chalk.yellow('> NOTE:')} ${msg}`
