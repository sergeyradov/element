# TestDataSource

TestDataSource is the instance returned by [TestDataFactory][TestDataFactory]'s methods.

Call TestDataSource's methods to configure your data source:

```typescript
import { step, Browser, TestData, TestSettings } from '@flood/element'
export const settings: TestSettings = {
  loopCount: -1
}

interface Row {
  username: string
  userID: number
}
TestData.fromCSV<Row>('users.csv')
  .circular(false) // Switch off circular data iteration.
                   // By default, when the end of the data is reached, it wraps to the beginning.
  .shuffle()       // Shuffle the data

export default () => {
   step('Step 1', (browser: Browser, row: Row) => {
     // for each loop, a different line from user.csv will be available as `row`
   })
}
```

### `circular(circular)`



Instructs the data feeder to repeat the data set when it reaches the end. TestData is circular by default; use this to turn circular data off.

**Parameters**

-   circular `boolean` (Optional, default: `true`)Default: true. Pass `false` to disable.
-   returns: [`TestDataSource`][TestDataSource]

### `filter(func)`



Adds a filter to apply against each line in the data set.

Filters can be chained, and will be run in order only if the previous ffilter passed.

Example:

```typescript
type Row = { browser: string, email: string }
TestData.fromCSV("users.csv").filter((line, index, browserID) => line.browser === browserID)
```

**Parameters**

-   func [`FeedFilterFunction`][FeedFilterFunction] filter function to compare each line
-   returns: [`TestDataSource`][TestDataSource]

### `shuffle(shuffle)`



Shuffles the data set using the Fisher-Yates method. Use this to randomise the order of your data. This will always be applied after filtering.

**Parameters**

-   shuffle `boolean` (Optional, default: `true`)Default: true. Pass `false` to disable.
-   returns: [`TestDataSource`][TestDataSource]
