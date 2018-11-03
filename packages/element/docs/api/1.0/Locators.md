---
title: By
class: By
position: '2'
articlegroup: API

---

# By

By is used to create [Locators][Locator] to find Elements or use in any place which accepts a Locator or [Locatable][].

### `attr(tagName, attrName, attrValue)`



Locates an element where the attribute matches the value.

**Example:**

```typescript
By.attr('name', 'frame-name')
```

**Parameters**

-   tagName `string` 
-   attrName `string` 
-   attrValue `string` 
-   returns: [`Locator`][Locator]

### `css(selector[, debugString])`



Locates an element using a CSS (jQuery) style selector.

This locator is implemented using `document.querySelector` on the page.

**Parameters**

-   selector `string` 
-   debugString? `string` (Optional)
-   returns: [`Locator`][Locator]

### `id(id)`



Locates elements by the ID attribute. This locator uses the CSS selector
`*[id="$ID"]`, _not_ `document.getElementById`.

**Parameters**

-   id `string` The ID to search for
-   returns: [`Locator`][Locator]

### `js(script, ...args)`



Locates an elements by evaluating a JavaScript expression.
The result of this expression must be an element or list of elements.

**Parameters**

-   script [`EvaluateFn`][EvaluateFn] The script to execute.
-   args `any`\[] 
-   returns: [`Locator`][Locator]

### `linkText(text)`



Locates link elements whose `textContent` matches the given
string.

**Parameters**

-   text `string` The link text to search for.
-   returns: [`Locator`][Locator]

### `nameAttr(value)`



Locates elements whose `name` attribute has the given value.

**Parameters**

-   value `string` The name attribute to search for.
-   returns: [`Locator`][Locator]

### `partialLinkText(text)`



Locates link elements whose `textContent` contains the given
substring.

**Parameters**

-   text `string` The substring to check for in a link's visible text.
-   returns: [`Locator`][Locator]

### `partialVisibleText(text)`



Locates all elements whose `textContent` contains the given
substring and is not hidden by CSS.

**Parameters**

-   text `string` The substring to check for in a elements's visible text.
-   returns: [`Locator`][Locator]

### `tagName(name)`



Locates elements with a given tag name.

**Parameters**

-   name `string` The tag name to search for.
-   returns: [`Locator`][Locator]

### `visibleText(text)`



Locates all elements whose `textContent` equals the given
substring and is not hidden by CSS.

**Parameters**

-   text `string` The string to check for in a elements's visible text.
-   returns: [`Locator`][Locator]

### `xpath(xpath)`



Locates elements matching a [XPath][] selector.

**Parameters**

-   xpath `string` The XPath selector to use.
-   returns: [`Locator`][Locator]
