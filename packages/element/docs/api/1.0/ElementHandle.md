# ElementHandle

ElementHandle represents a remote element in the DOM of the browser. It implements useful methods for querying and interacting with this DOM element.


All methods on this class are asynchronous and must be used with `await` to wait for the result to fulfill from the browser.


### `ElementHandle.bindBrowser(sss)`



#### Arguments

-   sss [`ScreenshotSaver`][ScreenshotSaver] 



















Clears focus from this element so that it will no longer receive keyboard inputs.











Schedules a command to clear the value of this element.
This command has no effect if the underlying DOM element is neither a text
INPUT, SELECT, or a TEXTAREA element.

















### `ElementHandle.click([, options])`



#### Arguments

-   options? [`ClickOptions`][ClickOptions] (Optional)







Sends a click event to the element attached to this handle. If the element is
currently outside the viewport it will first scroll to that element.

















### `doubleClick([, options])`



#### Arguments

-   options? [`ClickOptions`][ClickOptions] (Optional)







Sends a click event to the element attached to this handle. If the element is
currently outside the viewport it will first scroll to that element.





### `Locator.find(context[, node])`



#### Arguments

-   context `never` 
-   node? `undefined` (Optional)

### `Locator.find(context[, node])`



#### Arguments

-   context `never` 
-   node? `undefined` (Optional)













### `ElementHandle.findElement(locator)`



#### Arguments

-   locator `string` \| [`Locator`][Locator] 













### `ElementHandle.findElements(locator)`



#### Arguments

-   locator `string` \| [`Locator`][Locator] 







Locates all elements using the supplied [Locator][Locator], returning an array of [ElementHandle][ElementHandle]'s





### `Locator.findMany(context[, node])`



#### Arguments

-   context `never` 
-   node? `undefined` (Optional)

### `Locator.findMany(context[, node])`



#### Arguments

-   context `never` 
-   node? `undefined` (Optional)



















Sends focus to this element so that it receives keyboard inputs.





### `ElementHandle.getAttribute(key)`



#### Arguments

-   key `string` 







Fetches the value of an attribute on this element











Fetches the remote elements `id` attribute.





### `ElementHandle.getProperty(key)`



#### Arguments

-   key `string` 







getProperty

















### `initErrorString([, foundVia])`



#### Arguments

-   foundVia? `string` (Optional)



















Checks whether the remote element is displayed in the DOM and is visible to the user without being hidden by CSS or occluded by another element.











Checks whether the remote element is enabled. Typically this means it does not have a `disabled` property or attribute applied.











Checks whether the remote element is selectable. An element is selectable if it is an `<option>` or `input[type="checkbox"]` or radio button.











If the remote element is selectable (such as an `<option>` or `input[type="checkbox"]`) this methos will indicate whether it is selected.











Returns a promise that will be resolved to the element's location
as a {x:number, y:number} object.





### `ElementHandle.sendKeys(...keys)`



#### Arguments

-   keys `string`\[] 







Sends a series of key modifiers to the element.











Returns a promise that will be resolved with the element's size
as a {width:number, height:number} object











Fetches the remote elements `tagName` property.





### `ElementHandle.takeScreenshot([, options])`



#### Arguments

-   options? [`ScreenshotOptions`][ScreenshotOptions] (Optional)







Takes a screenshot of this element and saves it to the results folder with a random name.











Get the visible (i.e. not hidden by CSS) innerText of this element, including sub-elements, without any leading or trailing whitespace.

















### `ElementHandle.type(text)`



#### Arguments

-   text `string` 







Sends a series of key presses to the element to simulate a user typing on the keyboard. Use this to fill in input fields.




