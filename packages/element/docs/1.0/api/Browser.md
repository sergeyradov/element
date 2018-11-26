---
title: Browser
class: Browser
position: '1'
articleGroup: API

---

# `Browser`

Browser is the main entry point in each [step][], it's your direct connection to the browser running the test.

```typescript
import { step } from '@flood/element'
export default () => {
  step("Start", async browser => {
    await browser.visit("https://challenge.flood.io")
  })
}
```

## Methods

### `Browser.authenticate([, username, password])`



Sets the HTTP Authentication details to use if the page is presented with an authentication prompt.

Call without any args to disable authentication.

**Parameters**

-   username? `string` (Optional)
-   password? `string` (Optional)
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.blur(locator)`



Removes focus from the specified DOM element.

**Parameters**

-   locator [`NullableLocatable`][NullableLocatable] 
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.clear(locatable)`



Clears the selected value of an input or select control.

**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.clearBrowserCache()`



Clear browser cache.

**Parameters**

-   returns: [Promise&lt;`any`\>][Promise]

### `Browser.clearBrowserCookies()`



Clear browser cookies.

**Parameters**

-   returns: [Promise&lt;`any`\>][Promise]

### `Browser.click(locatable[, options])`



Sends a click event to the element located at `selector`. If the element is
currently outside the viewport it will first scroll to that element.

**Example:**

```typescript
step("Start", async browser => {
  await browser.click(By.partialLinkText('Start'))
})
```

In this example we're constructing a [Locatable][] using the `By.partialLinkText()` Locator, which will match the first `<a>` tag which contains the text "Start".

**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   options? [`ClickOptions`][ClickOptions] (Optional)
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.doubleClick(locatable[, options])`



Sends a double-click event to the element located by the supplied Locator or `selector`. If the element is
currently outside the viewport it will first scroll to that element.

**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   options? [`ClickOptions`][ClickOptions] (Optional)
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.emulateDevice(deviceName)`



Configure Browser to emulate a given device

**Parameters**

-   deviceName [`Device`][Device] 
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.evaluate(fn, ...args)`



**Parameters**

-   fn [`EvaluateFn`][EvaluateFn] 
-   args `any`\[] 
-   returns: [Promise&lt;`any`\>][Promise]

### `Browser.findElement(locator)`



Uses the provided locator to find the first element it matches, returning an ElementHandle.
If no element is found throws an error.

**Parameters**

-   locator [`NullableLocatable`][NullableLocatable] 
-   returns: [Promise&lt;[`ElementHandle`][ElementHandle]\>][Promise]

### `Browser.findElements(locator)`



Uses the provided locator to find all elements matching the locator condition, returning an array of ElementHandles

**Parameters**

-   locator [`NullableLocatable`][NullableLocatable] 
-   returns: [Promise&lt;[`ElementHandle`][ElementHandle]\[\]\>][Promise]

### `Browser.focus(locator)`



Makes the element located by the first argument the receiver of future input.

**Parameters**

-   locator [`NullableLocatable`][NullableLocatable]  The [Locator][] to use to find an element to send focus to.
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.highlightElement(element)`



Highlight an element. Useful in concert with takeScreenshot to tweak your locators.

**Parameters**

-   element [`ElementHandle`][ElementHandle] 
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.maybeFindElement(locator)`



Uses the provided locator to find the first element it matches, returning an ElementHandle.

**Parameters**

-   locator [`NullableLocatable`][NullableLocatable] 
-   returns: [Promise&lt;[`ElementHandle`][ElementHandle] \| `null`\>][Promise]

### `Browser.press(keyCode[, options])`



Presses a key on the keyboard specified by key code. For example, [Key.ALT][Key.ALT]

**Parameters**

-   keyCode `string` 
-   options?  (Optional)
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.selectByIndex(locatable, index)`



Selects an option within a `<select>` tag by its index in the list.

**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   index `string` 
-   returns: [Promise&lt;`string`\[\]\>][Promise]

### `Browser.selectByText(locatable, text)`



Selects an option within a `<select>` tag by matching its visible text.

**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   text `string` 
-   returns: [Promise&lt;`string`\[\]\>][Promise]

### `Browser.selectByValue(locatable, ...values)`



Selects an option within a `<select>` tag using the value of the `<option>` element.

**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   values `string`\[] 
-   returns: [Promise&lt;`string`\[\]\>][Promise]

### `Browser.sendKeys(...keys)`



`sendKeys` simulates typing a list of strings on the keyboard.

If a string is a member of [Key][] it is pressed individually. Otherwise the string is typed.
This allows sendKeys to simulate a user typing control keys such as `Key.ENTER`.

**Example:**

```typescript
await browser.click("#input_address")
await browser.sendKeys("Hello, World!", Key.ENTER)
```

**Parameters**

-   keys `string`\[] 
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.setUserAgent(userAgent)`



Set Browser to send a custom User Agent (UA) string

**Parameters**

-   userAgent `string` 
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.switchTo()`



Switch the focus of the browser to another frame, tab, or window.

**Parameters**

-   returns: [`TargetLocator`][TargetLocator]

### `Browser.takeScreenshot([, options])`



Takes a screenshot of the whole page and saves it to the `flood/results` folder with a random sequential name. You can download the archive of your test results at the end of the test to retrieve these screenshots.

**Parameters**

-   options? [`ScreenshotOptions`][ScreenshotOptions] (Optional)
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.title()`



Returns the title of the current page

**Parameters**

-   returns: [Promise&lt;`string`\>][Promise]

### `Browser.type(locatable, text[, options])`



Types a string into an `<input>` control, key press by key press. Use this to fill inputs as though it was typed by the user.

**Example:**

```typescript
step("Step 1", async browser => {
  await browser.type(By.css("#email"), "user@example.com")
})
```

**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   text `string` 
-   options?  (Optional)
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.visit(url[, options])`



Instructs the browser to navigate to a specific page. This is typically used as the
entrypoint to your test, as the first instruction it is also responsible for creating
a new Browser tab for this page to load into.

**Example:**

```typescript
step("Start", async browser => {
  await browser.visit("https://example.com")
})
```

**Parameters**

-   url `string`  url to visit
-   options? [`NavigationOptions`][NavigationOptions] (Optional) puppeteer navigation options
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.wait(timeoutOrCondition)`



Creates a waiter which will pause the test until a condition is met or a timeout is reached. This can be used for validation or control flow.

Check out [Until][] for a rich set of wait [Conditions][Condition].

**Example:**

```typescript
step('Start', async browser => {
  await browser.wait(Until.elementIsVisible(By.css('h1.title')))
})
```

You can use either a numeric value in seconds to wait for a specific time,
or a [Condition][], for more flexible conditions.

**Parameters**

-   timeoutOrCondition [`Condition`][Condition] \| `number` 
-   returns: [Promise&lt;`boolean`\>][Promise]

### `Browser.waitForNavigation()`



**Parameters**

-   returns: [Promise&lt;`any`\>][Promise]

## `Driver`

Driver is an alias to Browser. Please use Browser when possible.

> Notice:
>
> This is kept for simplifying migrations from Selenium WebDriver.js.

## `Locatable`

Locatable represents anything able to be located, either a string selector or a [Locator][Locator]. [Locators][Locator] are generally created using [By][] methods.

    [Locator][] | [ElementHandle][] | string

## `NullableLocatable`

NullableLocatable represents a [Locatable][Locatable] which could also be null.

Note that most Element location API methods accept a NullableLocatable but will throw an [Error][] if its actually [null][].

    [Locatable][] | null
