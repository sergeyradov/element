# TestData

`TestData` is a pre-configured instance of [TestDataFactory][TestDataFactory] that can be used to prepare test data for your script.

**Example**

```typescript
import { step, Browser, TestData, TestSettings } from '@flood/element'

interface Row {
  username: string
  userID: number
}
TestData.fromCSV<Row>('users.csv').shuffle()
```

# Feeder

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

# TestDataFactory

A `TestDataFactory` is available to be imported into your test script as `TestData`. Use this to load a [TestDataSource][TestDataSource] which provides new test data to each iteration of your test.

TODO
Files should be uploaded to ...
