# Browser

### `Browser.authenticate([, username, password])`



#### Arguments

-   username? `string` (Optional)
-   password? `string` (Optional)

### `Browser.authenticate([, username, password])`



#### Arguments

-   username? `string` (Optional)
-   password? `string` (Optional)













### `Browser.blur(locatable)`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] 













### `Browser.clear(locatable)`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] \| `string` 





































### `Browser.click(selectorOrLocator[, options])`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   options? [`ClickOptions`][ClickOptions] (Optional)

### `Browser.click(selectorOrLocator[, options])`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   options? [`ClickOptions`][ClickOptions] (Optional)







Sends a click event to the element located at `selector`. If the element is
currently outside the viewport it will first scroll to that element.





### `Browser.doubleClick(selectorOrLocator[, options])`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   options? [`ClickOptions`][ClickOptions] (Optional)

### `Browser.doubleClick(selectorOrLocator[, options])`



#### Arguments

-   selectorOrLocator [`NullableLocatable`][NullableLocatable] 
-   options? [`ClickOptions`][ClickOptions] (Optional)







Sends a double-click event to the element located by the supplied Locator or `selector`. If the element is
currently outside the viewport it will first scroll to that element.





### `Browser.emulateDevice(deviceName)`



#### Arguments

-   deviceName `string` 













### `Browser.evaluate(fn, ...args)`



#### Arguments

-   fn [`EvaluateFn`][EvaluateFn] 
-   args `any`\[] 

### `Browser.evaluate(fn, ...args)`



#### Arguments

-   fn [`EvaluateFn`][EvaluateFn] 
-   args `any`\[] 













### `extractText(locatable)`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] 

























### `Browser.findElement(locatable)`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] 













### `Browser.findElements(locatable)`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] 













### `Browser.focus(locatable)`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] 













### `Browser.highlightElement(element)`



#### Arguments

-   element [`ElementHandle`][ElementHandle] 

























### `Browser.maybeFindElement(locatable)`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] 































Fetches the paint performance timing entries

















### `Browser.press(keyCode[, options])`



#### Arguments

-   keyCode `string` 
-   options?  (Optional)

### `Browser.press(keyCode[, options])`



#### Arguments

-   keyCode `string` 
-   options?  (Optional)













### `saveScreenshot(fn)`



#### Arguments

-   fn  













### `Browser.selectByIndex(locatable, index)`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] 
-   index `string` 

### `Browser.selectByIndex(locatable, index)`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] 
-   index `string` 













### `Browser.selectByText(locatable, text)`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] 
-   text `string` 

### `Browser.selectByText(locatable, text)`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] 
-   text `string` 













### `Browser.selectByValue(locatable, ...values)`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] 
-   values `string`\[] 

### `Browser.selectByValue(locatable, ...values)`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] 
-   values `string`\[] 













### `Browser.sendKeys(...keys)`



#### Arguments

-   keys `string`\[] 













### `setCacheDisabled(cacheDisabled)`



#### Arguments

-   cacheDisabled `boolean` (Optional, default: `true`)













### `Browser.setUserAgent(userAgent)`



#### Arguments

-   userAgent `string` 



















Switch the focus of the browser to another frame or window





### `Browser.takeScreenshot([, options])`



#### Arguments

-   options? [`ScreenshotOptions`][ScreenshotOptions] (Optional)







Takes a screenshot of this element and saves it to the results folder with a random name.

















### `Browser.type(locatable, text[, options])`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] 
-   text `string` 
-   options?  (Optional)

### `Browser.type(locatable, text[, options])`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] 
-   text `string` 
-   options?  (Optional)

### `Browser.type(locatable, text[, options])`



#### Arguments

-   locatable [`NullableLocatable`][NullableLocatable] 
-   text `string` 
-   options?  (Optional)













### `Browser.visit(url, options)`



#### Arguments

-   url `string` 
-   options [`NavigationOptions`][NavigationOptions] (Optional, default: `{}`)

### `Browser.visit(url, options)`



#### Arguments

-   url `string` 
-   options [`NavigationOptions`][NavigationOptions] (Optional, default: `{}`)













### `Browser.wait(timeoutOrCondition)`



#### Arguments

-   timeoutOrCondition [`Condition`][Condition] \| `number` 
























