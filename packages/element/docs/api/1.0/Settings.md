# TestSettings

The TestSettings interface specifies the available settings you have to configure how your test runs. These properties should be exported using the property `settings`.

**Example:**

```typescript
export const settings: TestSettings = {
  loopCount: Infinity,
  clearCache: true
}
```

See [DEFAULT_SETTINGS] for a list of the default value for each setting.

## `ConsoleMethod`

Specifies a `console` method

## `ResponseTiming`

Specifies a method for recording response times.

| literal           | description                                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| step              | (Default) Records the wall clock time of a step. This is useful for Single Page Application which don't actually trigger a navigation.                                               |
| page              | Record the document loading response time. This is usually what you consider response time on paged web apps.                                                                        |
| network           | (Experimental) Takes the mean response time of all network requests which occur during a step. This is useful for Single Page Application which don't actually trigger a navigation. |
| stepWithThinkTime | `"stepWithThinkTime"`: Records the wall clock time of a step including `actionDelay` time.                                                                                           |

### `setup(settings)`



Declares the settings for the test, overriding the settings constant exported in the test script.

_This is a secondary syntax for `export const settings = {}` which functions exactly the same way._

**Example:**

```typescript
export default () => {
 setup({ waitTimeout: 60 })
}
```

**Parameters**

-   settings [`TestSettings`][TestSettings] 
-   returns: `void`

# `DEFAULT_SETTINGS`

The default settings for a Test. Any settings you provide are merged into these defaults.

| DEFAULT_SETTINGS          | Default Value                                               | Comment                                                        |
| :------------------------ | :---------------------------------------------------------- | :------------------------------------------------------------- |
| `actionDelay`             | 2                                                           |                                                                |
| `chromeVersion`           | "puppeteer"                                                 |                                                                |
| `clearCache`              | false                                                       |                                                                |
| `clearCookies`            | true                                                        |                                                                |
| `consoleFilter`           |  \[]                                                        | by default, don't filter any console messages from the browser |
| `device`                  | "Chrome Desktop Large"                                      |                                                                |
| `duration`                |  -1                                                         |                                                                |
| `ignoreHTTPSErrors`       | false                                                       |                                                                |
| `loopCount`               |  Infinity                                                   |                                                                |
| `responseTimeMeasurement` | "step"                                                      |                                                                |
| `screenshotOnFailure`     | true                                                        |                                                                |
| `stepDelay`               | 6                                                           |                                                                |
| `userAgent`               |  CustomDeviceDescriptors\['Chrome Desktop Large'].userAgent |                                                                |
| `waitTimeout`             | 30                                                          |                                                                |

[TestSettings]: ../../../../documented/Settings#testsettings
