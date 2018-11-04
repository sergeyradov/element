# `BoundingBox`

**Properties**

-   height `number` The height.


-   width `number` The width.


-   x `number` The x-coordinate of top-left corner.


-   y `number` The y-coordinate of top-left corner.

# `ClickOptions`

**Properties**

-   button? [`MouseButtons`][MouseButtons] (Optional)defaults to left


-   clickCount? `number` (Optional)defaults to 1


-   delay? `number` (Optional)Time to wait between mousedown and mouseup in milliseconds.  
      Defaults to 0.

# `NavigationOptions`

The navigation options.

**Properties**

-   timeout? `number` (Optional)Maximum navigation time in milliseconds, pass 0 to disable timeout.


-   waitUntil? [`LoadEvent`][LoadEvent] \| [`LoadEvent`][LoadEvent]\[] (Optional)When to consider navigation succeeded.

# `ScreenshotOptions`

Defines the screenshot options.

**Properties**

-   clip? [`BoundingBox`][BoundingBox] (Optional)An object which specifies clipping region of the page.


-   fullPage? `false` \| `true` (Optional)When true, takes a screenshot of the full scrollable page.


-   omitBackground? `false` \| `true` (Optional)Hides default white background and allows capturing screenshots with transparency.


-   path? `string` (Optional)The file path to save the image to. The screenshot type will be inferred from file extension.  
      If `path` is a relative path, then it is resolved relative to current working directory.  
      If no path is provided, the image won't be saved to the disk.


-   quality? `number` (Optional)The quality of the image, between 0-100. Not applicable to png images.


-   type? "jpeg" \| "png" (Optional)The screenshot type.

## `LoadEvent`

    "load" | "domcontentloaded" | "networkidle0" | "networkidle2"
