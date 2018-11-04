# `Condition`

A Condition represents a predicate which can be used to wait for an &lt;[ElementHandle]>. They are generally created by using &lt;[Until]>'s helper methods.

# `Until`

Until contains a wealth of useful [Condition][]s.

[Condition][]s represent predicates used to wait for something to become true.

These predicates include waiting for elements to become active, visible, invisible or disabled on the page.

You typically use these to control the flow of you test.

**Methods**

### `Until.ableToSwitchToFrame(frame)`



Creates a condition that will wait until the input driver is able to switch to the designated frame.

The target frame may be specified as:

-   string name of the frame to wait for matching the frame's `name` or `id` attribute.
-   (Coming soon) numeric index into window.frames for the currently selected frame.
-   (Coming soon) locator which may be used to first locate a FRAME or IFRAME on the current page before attempting to switch to it.

Upon successful resolution of this condition, the driver will be left focused on the new frame.

**Example:**

```typescript
step('Switch frame', async browser => {
  await browser.wait(Until.ableToSwitchToFrame('frame1'))
  ...
})
```

**Parameters**

-   frame [`Locatable`][Locatable] 
-   returns: [`Condition`][Condition]

### `Until.alertIsPresent()`



Creates a condition that waits for an alert to be opened. Upon success,
the returned promise will be fulfilled with the handle for the opened alert.

**Example:**

```typescript
step('Handle alert', async browser => {
  let dialog = await browser.wait(Until.alertIsPresent())
  await dialog.accept()
})
```

**Parameters**

-   returns: [`Condition`][Condition]

### `Until.elementIsDisabled(selectorOrLocator)`



Creates a condition that will wait for the given element to be disabled

**Example:**

```typescript
step('Element state', async browser => {
  let btnLocator = By.css('button.submit')
  await browser.wait(Until.elementIsDisabled(btnLocator))
  let element = await browser.findElement(btnLocator)
  // element disabled attribute should be true
})
```

**Parameters**

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] A [Locatable][] to use to find the element.
-   returns: [`Condition`][Condition]

### `Until.elementIsEnabled(selectorOrLocator)`



Creates a condition that will wait for the given element to be enabled

**Parameters**

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] A [Locatable][] to use to find the element.
-   returns: [`Condition`][Condition]

### `Until.elementIsNotSelected(selectorOrLocator)`



Creates a condition that will wait for the given element to be in the DOM, yet not visible to the user

**Parameters**

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] A [Locatable][] to use to find the element.
-   returns: [`Condition`][Condition]

### `Until.elementIsNotVisible(selectorOrLocator)`



Creates a condition that will wait for the given element to become visible.

Example:

```typescript
step("Step 1", async browser => {
	 await browser.click(By.css('.hide-panel'))
  await browser.wait(Until.elementIsNotVisible(By.id("btn")))
})
```

**Parameters**

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] A [Locatable][] to use to find the element.
-   returns: [`Condition`][Condition]

### `Until.elementIsSelected(selectorOrLocator)`



Creates a condition that will wait for the given element to be deselected.

**Parameters**

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] A [Locatable][] to use to find the element.
-   returns: [`Condition`][Condition]

### `Until.elementIsVisible(selectorOrLocator)`



Creates a condition that will wait for the given element to be selected.

Example:

```typescript
step("Step 1", async browser => {
  await browser.wait(Until.elementIsVisible(By.partialLinkText("Start")))
})
```

**Parameters**

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] A [Locatable][] to use to find the element.
-   returns: [`Condition`][Condition]

### `Until.elementLocated(selectorOrLocator)`



Creates a condition which will wait until the element is located on the page.

**Parameters**

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   returns: [`Condition`][Condition]

### `Until.elementTextContains(selectorOrLocator, text)`



Creates a condition which will wait until the element's text content contains the target text.

**Parameters**

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   text `string` 
-   returns: [`Condition`][Condition]

### `Until.elementTextIs(selectorOrLocator, text)`



Creates a condition which will wait until the element's text exactly matches the target text, excluding leading and trailing whitespace.

**Parameters**

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   text `string` 
-   returns: [`Condition`][Condition]

### `Until.elementTextMatches(selectorOrLocator, regex)`



Creates a condition which will wait until the element's text matches the target Regular Expression.

**Parameters**

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   regex [`RegExp`][RegExp] 
-   returns: [`Condition`][Condition]

### `Until.elementsLocated(selectorOrLocator, desiredCount)`



Creates a condition that will wait until at least the desired number of elements are found.

**Parameters**

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   desiredCount `number` (Optional, default: `1`)
-   returns: [`Condition`][Condition]

### `Until.titleContains(title)`



Creates a condition which waits until the page title contains the expected text.

**Parameters**

-   title `string` 
-   returns: [`Condition`][Condition]

### `Until.titleIs(title)`



Creates a condition which waits until the page title exactly matches the expected text.

**Parameters**

-   title `string` 
-   returns: [`Condition`][Condition]

### `Until.titleMatches(title)`



Creates a condition which waits until the page title matches the title `RegExp`.

**Parameters**

-   title [`RegExp`][RegExp] 
-   returns: [`Condition`][Condition]

### `Until.urlContains(url)`



Creates a condition which waits until the page URL contains the expected path.

**Parameters**

-   url `string` 
-   returns: [`Condition`][Condition]

### `Until.urlIs(url)`



Creates a condition which waits until the page URL exactly matches the expected URL.

**Parameters**

-   url `string` 
-   returns: [`Condition`][Condition]

### `Until.urlMatches(url)`



Creates a condition which waits until the page URL matches the supplied `RegExp`.

**Parameters**

-   url [`RegExp`][RegExp] 
-   returns: [`Condition`][Condition]
