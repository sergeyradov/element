# ElementHandle

ElementHandle represents a remote element in the DOM of the browser. It implements useful methods for querying and interacting with this DOM element.

All methods on this class are asynchronous and must be used with `await` to wait for the result to fulfill from the browser.

### `ElementHandle.bindBrowser(sss)`



**Parameters**

-   sss [`ScreenshotSaver`][ScreenshotSaver] 
-   returns: `void`

### `ElementHandle.blur()`



Clears focus from this element so that it will no longer receive keyboard inputs.

**Parameters**

-   returns: [Promise&lt;`void`\>][Promise]

### `ElementHandle.clear()`



Schedules a command to clear the value of this element.
This command has no effect if the underlying DOM element is neither a text
INPUT, SELECT, or a TEXTAREA element.

**Parameters**

-   returns: [Promise&lt;`void`\>][Promise]

### `clearHighlights()`



**Parameters**

-   returns: [Promise&lt;`void`\>][Promise]

### `ElementHandle.click([, options])`



Sends a click event to the element attached to this handle. If the element is
currently outside the viewport it will first scroll to that element.

**Parameters**

-   options? [`ClickOptions`][ClickOptions] (Optional)
-   returns: [Promise&lt;`void`\>][Promise]

### `ElementHandle.dispose()`



**Parameters**

-   returns: [Promise&lt;`void`\>][Promise]

### `doubleClick([, options])`



Sends a click event to the element attached to this handle. If the element is
currently outside the viewport it will first scroll to that element.

**Parameters**

-   options? [`ClickOptions`][ClickOptions] (Optional)
-   returns: [Promise&lt;`void`\>][Promise]

### `Locator.find(context[, node])`



**Parameters**

-   context `never` 
-   node? `undefined` (Optional)
-   returns: [Promise&lt;[`ElementHandle`][ElementHandle] \| `null`\>][Promise]

### `ElementHandle.findElement(locator)`



**Parameters**

-   locator `string` \| [`Locator`][Locator] 
-   returns: [Promise&lt;[`IElementHandle`][IElementHandle] \| `null`\>][Promise]

### `ElementHandle.findElements(locator)`



Locates all elements using the supplied [Locator][Locator], returning an array of [ElementHandle][ElementHandle]'s

**Parameters**

-   locator `string` \| [`Locator`][Locator] 
-   returns: [Promise&lt;[`IElementHandle`][IElementHandle]\[\]\>][Promise]

### `Locator.findMany(context[, node])`



**Parameters**

-   context `never` 
-   node? `undefined` (Optional)
-   returns: [Promise&lt;[`ElementHandle`][ElementHandle]\[\]\>][Promise]

### `ElementHandle.focus()`



Sends focus to this element so that it receives keyboard inputs.

**Parameters**

-   returns: [Promise&lt;`void`\>][Promise]

### `ElementHandle.getAttribute(key)`



Fetches the value of an attribute on this element

**Parameters**

-   key `string` 
-   returns: [Promise&lt;`string` \| `null`\>][Promise]

### `ElementHandle.getId()`



Fetches the remote elements `id` attribute.

**Parameters**

-   returns: [Promise&lt;`string` \| `null`\>][Promise]

### `ElementHandle.getProperty(key)`



getProperty

**Parameters**

-   key `string` 
-   returns: [Promise&lt;`string` \| `null`\>][Promise]

### `ElementHandle.highlight()`



**Parameters**

-   returns: [Promise&lt;`void`\>][Promise]

### `initErrorString([, foundVia])`



**Parameters**

-   foundVia? `string` (Optional)
-   returns: [Promise&lt;[`ElementHandle`][ElementHandle]\>][Promise]

### `ElementHandle.isDisplayed()`



Checks whether the remote element is displayed in the DOM and is visible to the user without being hidden by CSS or occluded by another element.

**Parameters**

-   returns: [Promise&lt;`boolean`\>][Promise]

### `ElementHandle.isEnabled()`



Checks whether the remote element is enabled. Typically this means it does not have a `disabled` property or attribute applied.

**Parameters**

-   returns: [Promise&lt;`boolean`\>][Promise]

### `ElementHandle.isSelectable()`



Checks whether the remote element is selectable. An element is selectable if it is an `<option>` or `input[type="checkbox"]` or radio button.

**Parameters**

-   returns: [Promise&lt;`boolean`\>][Promise]

### `ElementHandle.isSelected()`



If the remote element is selectable (such as an `<option>` or `input[type="checkbox"]`) this methos will indicate whether it is selected.

**Parameters**

-   returns: [Promise&lt;`boolean`\>][Promise]

### `ElementHandle.location()`



Returns a promise that will be resolved to the element's location
as a {x:number, y:number} object.

**Parameters**

-   returns: [Promise&lt;\>][Promise]

### `ElementHandle.sendKeys(...keys)`



Sends a series of key modifiers to the element.

**Parameters**

-   keys `string`\[] 
-   returns: [Promise&lt;`void`\>][Promise]

### `ElementHandle.size()`



Returns a promise that will be resolved with the element's size
as a {width:number, height:number} object

**Parameters**

-   returns: [Promise&lt;\>][Promise]

### `ElementHandle.tagName()`



Fetches the remote elements `tagName` property.

**Parameters**

-   returns: [Promise&lt;`string` \| `null`\>][Promise]

### `ElementHandle.takeScreenshot([, options])`



Takes a screenshot of this element and saves it to the results folder with a random name.

**Parameters**

-   options? [`ScreenshotOptions`][ScreenshotOptions] (Optional)
-   returns: [Promise&lt;`void`\>][Promise]

### `ElementHandle.text()`



Get the visible (i.e. not hidden by CSS) innerText of this element, including sub-elements, without any leading or trailing whitespace.

**Parameters**

-   returns: [Promise&lt;`string`\>][Promise]

### `Locator.toErrorString()`



**Parameters**

-   returns: `string`

### `ElementHandle.type(text)`



Sends a series of key presses to the element to simulate a user typing on the keyboard. Use this to fill in input fields.

**Parameters**

-   text `string` 
-   returns: [Promise&lt;`void`\>][Promise]
