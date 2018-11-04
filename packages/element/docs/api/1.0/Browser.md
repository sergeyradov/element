---
title: Browser
class: Browser
position: '1'
articlegroup: API

---

# Browser

# Browser

Browser is the main entry point in each [step][step], it's your direct connection to the browser running the test.

```typescript
import { step } from '@flood/element'
export default () => {
  step("Start", async browser => {
    await browser.visit("https://challenge.flood.io")
  })
}
```

## `Driver`

Driver is an alias to Browser. Please use Browser when possible.

> Notice:
>
> This is kept for simplifying migrations from Selenium WebDriver.js.

## `Locatable`

Locatable represents anything able to be located, either a string selector or a [Locator][Locator]. [Locator][Locator]s are generally created using [By][By] methods.

## `NullableLocatable`

NullableLocatable represents a [Locatable][Locatable] which could also be null.

Note that most Element location API methods accept a NullableLocatable but will throw an [Error][Error] if its actually [null][null].

[step]: ../../../../documented/DSL#step

[null]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null
