---
docopaque: ''

---

# Condition

A Condition represents a predicate which can be used to wait for an [ElementHandle][ElementHandle]. They are generally created by using [Until][Until]'s helper methods.

















### `waitFor(frame[, page])`



#### Arguments

-   frame [`Frame`][Frame] 
-   page? [`Page`][Page] (Optional)

### `waitFor(frame[, page])`



#### Arguments

-   frame [`Frame`][Frame] 
-   page? [`Page`][Page] (Optional)













### `waitForEvent(page)`



#### Arguments

-   page [`Page`][Page] 













# Until

Until contains a wealth of useful [Condition][]s.


[Condition][]s represent predicates used to wait for something to become true.

These predicates include waiting for elements to become active, visible, invisible or disabled on the page.

You typically use these to control the flow of you test.


### `ableToSwitchToFrame(frame)`



#### Arguments

-   frame [`Locatable`][Locatable] 







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








Creates a condition that waits for an alert to be opened. Upon success,
the returned promise will be fulfilled with the handle for the opened alert.


**Example:**

```typescript
step('Handle alert', async browser => {
  let dialog = await browser.wait(Until.alertIsPresent())
  await dialog.accept()
})
```


### `elementIsDisabled(selectorOrLocator)`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] A [Locatable][] to use to find the element.








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


### `elementIsEnabled(selectorOrLocator)`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] A [Locatable][] to use to find the element.








Creates a condition that will wait for the given element to be enabled





### `elementIsNotSelected(selectorOrLocator)`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] A [Locatable][] to use to find the element.








Creates a condition that will wait for the given element to be in the DOM, yet not visible to the user





### `elementIsNotVisible(selectorOrLocator)`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] A [Locatable][] to use to find the element.








Creates a condition that will wait for the given element to become visible.


Example:

```typescript
step("Step 1", async browser => {
	 await browser.click(By.css('.hide-panel'))
  await browser.wait(Until.elementIsNotVisible(By.id("btn")))
})
```


### `elementIsSelected(selectorOrLocator)`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] A [Locatable][] to use to find the element.








Creates a condition that will wait for the given element to be deselected.





### `elementIsVisible(selectorOrLocator)`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] A [Locatable][] to use to find the element.








Creates a condition that will wait for the given element to be selected.


Example:

```typescript
step("Step 1", async browser => {
  await browser.wait(Until.elementIsVisible(By.partialLinkText("Start")))
})
```


### `elementLocated(selectorOrLocator)`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 







Creates a condition which will wait until the element is located on the page.





### `elementTextContains(selectorOrLocator, text)`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   text `string` 

### `elementTextContains(selectorOrLocator, text)`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   text `string` 







Creates a condition which will wait until the element's text content contains the target text.





### `elementTextIs(selectorOrLocator, text)`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   text `string` 

### `elementTextIs(selectorOrLocator, text)`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   text `string` 







Creates a condition which will wait until the element's text exactly matches the target text, excluding leading and trailing whitespace.





### `elementTextMatches(selectorOrLocator, regex)`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   regex [`RegExp`][RegExp] 

### `elementTextMatches(selectorOrLocator, regex)`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   regex [`RegExp`][RegExp] 







Creates a condition which will wait until the element's text matches the target Regular Expression.





### `elementsLocated(selectorOrLocator, desiredCount)`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   desiredCount `number` (Optional, default: `1`)

### `elementsLocated(selectorOrLocator, desiredCount)`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   desiredCount `number` (Optional, default: `1`)







Creates a condition that will wait until at least the desired number of elements are found.





### `titleContains(title)`



#### Arguments

-   title `string` 







Creates a condition which waits until the page title contains the expected text.





### `titleIs(title)`



#### Arguments

-   title `string` 







Creates a condition which waits until the page title exactly matches the expected text.





### `titleMatches(title)`



#### Arguments

-   title [`RegExp`][RegExp] 







Creates a condition which waits until the page title matches the title `RegExp`.





### `urlContains(url)`



#### Arguments

-   url `string` 







Creates a condition which waits until the page URL contains the expected path.





### `urlIs(url)`



#### Arguments

-   url `string` 







Creates a condition which waits until the page URL exactly matches the expected URL.





### `urlMatches(url)`



#### Arguments

-   url [`RegExp`][RegExp] 







Creates a condition which waits until the page URL matches the supplied `RegExp`.




