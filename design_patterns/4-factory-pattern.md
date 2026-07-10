# Factory Design Pattern

## Interview Definition

> **Factory Pattern is a Creational Design Pattern that centralizes object creation. Instead of creating objects directly, the client requests the required object from a factory. The factory handles the object creation logic and returns the appropriate object, hiding the implementation details from the client.**

---

## What is Factory Design Pattern?

Factory Pattern is a **Creational Design Pattern** used to **create objects from a single place**.

Instead of creating objects directly, the client simply asks the factory for the required object.

The factory decides **how to create the object** and returns it.

> **The client knows what object it wants, but not how it is created.**

---

## Purpose

- Hide object creation logic from the user.
- Centralize object creation in one place.
- Reduce duplicate code.
- Make code easier to maintain and update.

---

## Automation Framework Example

Suppose our automation framework supports multiple browsers:

- Chromium
- Firefox
- WebKit

Instead of creating browser objects directly like this:

```ts
const browser = await chromium.launch();

// or

const browser = await firefox.launch();
```

We create a **BrowserFactory** class that is responsible for creating browser objects.

```ts
import { chromium, firefox, webkit, Browser } from "@playwright/test";

export class BrowserFactory {

    static async launchBrowser(browserName: string): Promise<Browser> {

        switch (browserName.toLowerCase()) {

            case "chromium":
                return await chromium.launch();

            case "firefox":
                return await firefox.launch();

            case "webkit":
                return await webkit.launch();

            default:
                throw new Error("Unsupported browser");
        }
    }
}
```

Now the client simply calls the factory:

```ts
const browser = await BrowserFactory.launchBrowser("chromium");
```

### What does the client know?

- There is a `BrowserFactory` class.
- Call the static `launchBrowser()` method.
- Pass the browser name.
- A browser instance is returned.

### What is hidden from the client?

- Which `launch()` method is called.
- How the browser object is created.
- Any browser configuration or initialization logic.

All the object creation logic is centralized inside the **BrowserFactory** class.

---

## Factory Pattern in Playwright

In modern Playwright frameworks, we generally **do not implement a Browser Factory** because Playwright already provides this functionality.

Playwright manages browser creation using:

- Built-in fixtures (`browser`, `context`, `page`)
- `playwright.config.ts` for browser configuration
- Automatic browser lifecycle management

So, instead of writing our own factory, we simply use the built-in fixtures provided by Playwright.

This is why the Factory Pattern is **good to understand for interviews and general software design**, but in Playwright automation frameworks, it is usually **not required**.
