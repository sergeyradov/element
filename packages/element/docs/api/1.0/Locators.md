---
title: By
class: By
position: '2'
articlegroup: API

---

# By

By is used to create [Locators][Locator] to find Elements or use in any place which accepts a Locator or [Locatable][].





### `attr(tagName, attrName, attrValue)`



#### Arguments

-   tagName `string` 
-   attrName `string` 
-   attrValue `string` 

### `attr(tagName, attrName, attrValue)`



#### Arguments

-   tagName `string` 
-   attrName `string` 
-   attrValue `string` 

### `attr(tagName, attrName, attrValue)`



#### Arguments

-   tagName `string` 
-   attrName `string` 
-   attrValue `string` 







Locates an element where the attribute matches the value.


**Example:**
By.attr('name', 'frame-name')


### `css(selector[, debugString])`



#### Arguments

-   selector `string` 
-   debugString? `string` (Optional)

### `css(selector[, debugString])`



#### Arguments

-   selector `string` 
-   debugString? `string` (Optional)







Locates an element using a CSS (jQuery) style selector





### `id(id)`



#### Arguments

-   id `string` The ID to search for








Locates elements by the ID attribute. This locator uses the CSS selector
`*[id="$ID"]`, _not_ `document.getElementById`.





### `js(script, ...args)`



#### Arguments

-   script [`EvaluateFn`][EvaluateFn] The script to execute.

-   args `any`\[] 

### `js(script, ...args)`



#### Arguments

-   script [`EvaluateFn`][EvaluateFn] The script to execute.

-   args `any`\[] 







Locates an elements by evaluating a JavaScript expression.
The result of this expression must be an element or list of elements.





### `linkText(text)`



#### Arguments

-   text `string` The link text to search for.








Locates link elements whose `textContent` matches the given
string.





### `nameAttr(value)`



#### Arguments

-   value `string` The name attribute to search for.








Locates elements whose `name` attribute has the given value.





### `partialLinkText(text)`



#### Arguments

-   text `string` The substring to check for in a link's visible text.








Locates link elements whose `textContent` contains the given
substring.





### `partialVisibleText(text)`



#### Arguments

-   text `string` The substring to check for in a elements's visible text.








Locates all elements whose `textContent` contains the given
substring and is not hidden by CSS.





### `tagName(name)`



#### Arguments

-   name `string` The tag name to search for.








Locates elements with a given tag name.





### `visibleText(text)`



#### Arguments

-   text `string` The string to check for in a elements's visible text.








Locates all elements whose `textContent` equals the given
substring and is not hidden by CSS.





### `xpath(xpath)`



#### Arguments

-   xpath `string` The XPath selector to use.








Locates elements matching a [XPath][] selector.




