# Browser

### `Browser.authenticate([, username, password])`



**Parameters**

-   username? `string` (Optional)
-   password? `string` (Optional)
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.blur(locatable)`



**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.clear(locatable)`



**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] \| `string` 
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.clearBrowserCache()`



**Parameters**

-   returns: [Promise&lt;`any`\>][Promise]

### `Browser.clearBrowserCookies()`



**Parameters**

-   returns: [Promise&lt;`any`\>][Promise]

### `Browser.click(selectorOrLocator[, options])`



Sends a click event to the element located at `selector`. If the element is
currently outside the viewport it will first scroll to that element.

**Parameters**

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   options? [`ClickOptions`][ClickOptions] (Optional)
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.doubleClick(selectorOrLocator[, options])`



Sends a double-click event to the element located by the supplied Locator or `selector`. If the element is
currently outside the viewport it will first scroll to that element.

**Parameters**

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   options? [`ClickOptions`][ClickOptions] (Optional)
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.emulateDevice(deviceName)`



**Parameters**

-   deviceName `string` 
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.evaluate(fn, ...args)`



**Parameters**

-   fn [`EvaluateFn`][EvaluateFn] 
-   args `any`\[] 
-   returns: [Promise&lt;`any`\>][Promise]

### `extractText(locatable)`



**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   returns: [Promise&lt;`string`\>][Promise]

### `fetchScreenshots()`



**Parameters**

-   returns: `string`\[]

### `Browser.findElement(locatable)`



**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   returns: [Promise&lt;[`ElementHandle`][ElementHandle]\>][Promise]

### `Browser.findElements(locatable)`



**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   returns: [Promise&lt;[`ElementHandle`][ElementHandle]\[\]\>][Promise]

### `Browser.focus(locatable)`



**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.highlightElement(element)`



**Parameters**

-   element [`ElementHandle`][ElementHandle] 
-   returns: [Promise&lt;`void`\>][Promise]

### `interactionTiming()`



**Parameters**

-   returns: [Promise&lt;`number`\>][Promise]

### `Browser.maybeFindElement(locatable)`



**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   returns: [Promise&lt;[`ElementHandle`][ElementHandle] \| `null`\>][Promise]

### `navigationTiming()`



**Parameters**

-   returns: [Promise&lt;[`PerformanceTiming`][PerformanceTiming]\>][Promise]

### `paintTiming()`



Fetches the paint performance timing entries

**Parameters**

-   returns: [Promise&lt;[`PerformanceEntry`][PerformanceEntry]\[\]\>][Promise]

### `performanceTiming()`



**Parameters**

-   returns: [Promise&lt;[`PerformanceTiming`][PerformanceTiming]\>][Promise]

### `Browser.press(keyCode[, options])`



**Parameters**

-   keyCode `string` 
-   options?  (Optional)
-   returns: [Promise&lt;`void`\>][Promise]

### `saveScreenshot(fn)`



**Parameters**

-   fn  
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.selectByIndex(locatable, index)`



**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   index `string` 
-   returns: [Promise&lt;`string`\[\]\>][Promise]

### `Browser.selectByText(locatable, text)`



**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   text `string` 
-   returns: [Promise&lt;`string`\[\]\>][Promise]

### `Browser.selectByValue(locatable, ...values)`



**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   values `string`\[] 
-   returns: [Promise&lt;`string`\[\]\>][Promise]

### `Browser.sendKeys(...keys)`



**Parameters**

-   keys `string`\[] 
-   returns: [Promise&lt;`void`\>][Promise]

### `setCacheDisabled(cacheDisabled)`



**Parameters**

-   cacheDisabled `boolean` (Optional, default: `true`)
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.setUserAgent(userAgent)`



**Parameters**

-   userAgent `string` 
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.switchTo()`



Switch the focus of the browser to another frame or window

**Parameters**

-   returns: [`TargetLocator`][TargetLocator]

### `Browser.takeScreenshot([, options])`



Takes a screenshot of this element and saves it to the results folder with a random name.

**Parameters**

-   options? [`ScreenshotOptions`][ScreenshotOptions] (Optional)
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.title()`



**Parameters**

-   returns: [Promise&lt;`string`\>][Promise]

### `Browser.type(locatable, text[, options])`



**Parameters**

-   locatable [`NullableLocatable`][NullableLocatable] 
-   text `string` 
-   options?  (Optional)
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.visit(url, options)`



**Parameters**

-   url `string` 
-   options [`NavigationOptions`][NavigationOptions] (Optional, default: `{}`)
-   returns: [Promise&lt;`void`\>][Promise]

### `Browser.wait(timeoutOrCondition)`



**Parameters**

-   timeoutOrCondition [`Condition`][Condition] \| `number` 
-   returns: [Promise&lt;`boolean`\>][Promise]

### `Browser.waitForNavigation()`



**Parameters**

-   returns: [Promise&lt;`any`\>][Promise]
