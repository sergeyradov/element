/**
 * @docPage Waiters
 * @article_group API
 */
export { Until } from './src/page/Until'

/**
 * @docPage Waiters
 * @article_group API
 */
export { Condition } from './src/page/Condition'

/**
 * @docPage Constants
 * @article_group API
 */
export { Device, Key, MouseButtons } from './src/page/Enums'

/**
 * Locators make it easy to locate elements on the page.
 *
 * @docPage Locators
 * @article_group API
 */
export { By } from './src/page/By'

/**
 * @docPage Locators
 * @article_group API
 */
export { Locator } from './src/page/types'

/**
 * @docPage ElementHandle
 * @article_group API
 */
export { ElementHandle } from './src/page/types'

/**
 * @docPage TargetLocator
 * @article_group API
 */
export { TargetLocator } from './src/page/types'

/**
 * @docPage TestData
 * @docAlias TestDataFactory TestData
 * @article_group API
 */
export { TestDataFactory, TestDataSource } from './src/test-data/TestData'

import { NullTestDataLoaders } from './src/test-data/TestDataLoaders'
/**
 * `TestData` is a pre-configured instance of [TestDataFactory][] that can be used to prepare test data for your script.
 *
 * **Example**
 * ```typescript
 * import { step, Browser, TestData, TestSettings } from '@flood/element'
 *
 * interface Row {
 *   username: string
 *   userID: number
 * }
 * TestData.fromCSV<Row>('users.csv').shuffle()
 * ```
 *
 * @docPage TestData
 * @article_group API
 */
export const TestData = new NullTestDataLoaders()

/**
 * @docPage TestData
 * @article_group API
 */
export { Feeder } from './src/test-data/Feeder'

/**
 * @docPage Settings
 */
export {
	TestSettings,
	setup,
	DEFAULT_SETTINGS,
	ConsoleMethod,
	ResponseTiming,
} from './src/runtime/Settings'

/**
 * @docPage DSL
 * @article_group API
 */
export { FloodProcessEnv } from './src/runtime-environment/types'

import { FloodProcessEnv, nullFloodProcessEnv } from './src/runtime-environment/types'

/**
 * A subset of `process.env` available to this test. It is of type [FloodProcessEnv][].
 * @docPage DSL
 * @article_group API
 */
export const ENV: FloodProcessEnv = nullFloodProcessEnv

/**
 * @docPage Browser
 * @article_group API
 */
export { Browser, Browser as Driver, Locatable, NullableLocatable } from './src/runtime/types'

/**
 * @docPage Puppeteer
 * @article_group API
 * @position 10
 */
export {
	ClickOptions,
	ScreenshotOptions,
	NavigationOptions,
	BoundingBox,
	LoadEvent,
} from 'puppeteer'

/**
 * @docPage DSL
 * @article_group API
 */
export { step, StepFunction, StepOptions } from './src/runtime/Step'

/**
 * @docPage DSL
 * @article_group API
 */
export { suite } from './src/runtime/types'
