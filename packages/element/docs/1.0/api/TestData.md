# `TestData`

`TestData` is a pre-configured instance of &lt;[TestDataFactory]> that can be used to prepare test data for your script.

**Example**

```typescript
import { step, Browser, TestData, TestSettings } from '@flood/element'

interface Row {
  username: string
  userID: number
}
TestData.fromCSV<Row>('users.csv').shuffle()
```

# `Feeder`

**Methods**

### `Feeder.append(lines)`



**Parameters**

-   lines `void`\[] 
-   returns: [`Feeder`][Feeder]

### `Feeder.circular(loop)`



Configures the feeder to reset at the end, creating a repeating loop

**Parameters**

-   loop `boolean` (Optional, default: `true`)
-   returns: [`Feeder`][Feeder]

### `Feeder.feed()`



Advances the feed by one iteration

**Parameters**

-   returns: [`Option`][Option]

### `Feeder.filter(func)`



**Parameters**

-   func [`FeedFilterFunction`][FeedFilterFunction] 
-   returns: [`Feeder`][Feeder]

### `Feeder.peek()`



Reads the data at the current cursor without advancing

**Parameters**

-   returns: [`Option`][Option]

### `Feeder.reset()`



**Parameters**

-   returns: `void`

### `Feeder.shuffle(shuffle)`



**Parameters**

-   shuffle `boolean` (Optional, default: `true`)
-   returns: [`Feeder`][Feeder]

### `Feeder.toString()`



**Parameters**

-   returns: `string`

**Properties**

-   filters [`FeedFilterFunction`][FeedFilterFunction]\[] 


-   instanceID `string` 


-   lines `void`\[] 


-   pointer `number` 


-   resetOnEnd `boolean` (Optional, default: `true`)


-   shuffleAfterLoad `boolean` (Optional, default: `false`)

# `TestDataSource`

TestDataSource is the instance returned by &lt;[TestDataFactory]>'s methods.

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

**Methods**

### `TestDataSource.circular(circular)`



Instructs the data feeder to repeat the data set when it reaches the end. TestData is circular by default; use this to turn circular data off.

**Parameters**

-   circular `boolean` (Optional, default: `true`)Passing `false` will to disable circular data loading, causing test to complete after 1 loop of test data.
-   returns: [`TestDataSource`][TestDataSource]

### `TestDataSource.filter(func)`



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

### `TestDataSource.shuffle(shuffle)`



Shuffles the data set using the Fisher-Yates method. Use this to randomise the order of your data. This will always be applied after filtering.

**Parameters**

-   shuffle `boolean` (Optional, default: `true`)
-   returns: [`TestDataSource`][TestDataSource]

**Properties**

# `TestDataFactory`

A `TestDataFactory` is available to be imported into your test script as `TestData`. Use this to load a &lt;[TestDataSource]> which provides new test data to each iteration of your test.

TODO
Files should be uploaded to ...

**Methods**

### `TestDataFactory.fromCSV(filename, separator)`



Loads test data from a CSV file, returning a `TestData` instance.

**Parameters**

-   filename `string` the CSV to load
-   separator `string` (default: `,`) CSV separator to use
-   returns: [`TestDataSource`][TestDataSource]

### `TestDataFactory.fromData(objects)`



Loads a standard Javascript array of data objects

**Parameters**

-   objects `void`\[] an array of data objects
-   returns: [`TestDataSource`][TestDataSource]

### `TestDataFactory.fromJSON(filename)`



Loads data from a JSON ffile

**Parameters**

-   filename `string` the JSON to load.
-   returns: [`TestDataSource`][TestDataSource]
