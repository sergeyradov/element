---
internal: ''

---

# TargetLocator

























Navigates to the topmost frame





### `TargetLocator.frame(id)`



#### Arguments

-   id `number` \| `string` \| [`IElementHandle`][IElementHandle] number | string | ElementHandle








Changes the active target to another frame.


Accepts either:

number: Switch to frame by index in window.frames,
string: Switch to frame by frame.name or frame.id, whichever matches first,
ElementHandle: Switch to a frame using the supplied ElementHandle of a frame.

