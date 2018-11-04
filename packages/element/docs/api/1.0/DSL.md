# ENV

A subset of `process.env` available to this test. It is of type [FloodProcessEnv][FloodProcessEnv].

# FloodProcessEnv

# StepOptions

Specifies the available options which can be supplied to a step to override global settings.

**Example:**

```typescript
step("Step 1", { waitTimeout: 300 }, async (browser: Browser) => {
	await browser.click(...)
})
```

## `StepFunction`

The `StepFunction` type represents a function to be called as a Test step.

-   `browser` [Browser][Browser] the browser
-   `data` &lt;`T`> (Optional) a row of test data of type &lt;`T`>. Only available when the test is set up using [suite][suite].

**Example:**

```typescript
const step1: StepFunction = async (browser: Browser) => {
	await browser.click(...)
}
```

### `step(name, fn)`



Declares each step in your test. This must go within your main test expression.

**Example:**

```typescript
export default () => {
  step("Step 1", async (browser: Browser) => {
    await browser.visit("https://example.com")
  })

  step("Step 2", async (browser: Browser) => {})

  step("Step 3", async (browser: Browser) => {})
}
```

**Parameters**

-   name `string` Step Name
-   fn [`StepFunction`][StepFunction] Actual implementation of step
-   returns: `void`

# suite

Defines a test suite of steps to run.

**Example:**

```typescript
import { TestData } from '@flood/element'
interface Row {
  user: string
  systemID: number
}
const testData = TestData.withCSV<Row>(...)

export default suite.withData((testData, step) => {
  step("Step 1", async (browser: Browser, row: Row) => {
    await browser.visit(`http://example.com/user-${row.systemID}.html`)
  })
})
```

[suite]: ../../../../documented/DSL#suite

[StepFunction]: ../../../../documented/DSL#stepfunction
