---
internal: ''

---

# TargetLocator

### `TargetLocator.activeElement()`



**Parameters**

-   returns: [Promise&lt;[`ElementHandle`][ElementHandle] \| `null`\>][Promise]

### `TargetLocator.defaultContent()`



Navigates to the topmost frame

**Parameters**

-   returns: [Promise&lt;`void`\>][Promise]

### `TargetLocator.frame(id)`



Changes the active target to another frame.

Accepts either:

number: Switch to frame by index in window.frames,
string: Switch to frame by frame.name or frame.id, whichever matches first,
ElementHandle: Switch to a frame using the supplied ElementHandle of a frame.

**Parameters**

-   id `number` \| `string` \| [`IElementHandle`][IElementHandle] number | string | ElementHandle
-   returns: [Promise&lt;`void`\>][Promise]
