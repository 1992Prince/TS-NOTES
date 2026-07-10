
# Template Method Design Pattern

## Interview Definition

> **Template Method Pattern is a Behavioral Design Pattern that defines the overall structure of an algorithm in a base class while allowing subclasses to provide or override specific implementations.**

---

## What is Template Method Pattern?

A base class defines the common workflow or common functionality.

Child classes inherit from the base class and reuse the common code, while implementing or overriding only what is different.

> **The base class defines the template, and child classes follow it.**

---

## Purpose

- Avoid duplicate code.
- Keep common functionality in one place.
- Allow child classes to reuse common logic.
- Improve maintainability.

---

## Automation Framework Example

In our framework, we have a **BasePage** class.

```ts
export class BasePage {

    constructor(protected page: Page) {}

    async click(locator: Locator) {
        await locator.click();
    }

    async fill(locator: Locator, value: string) {
        await locator.fill(value);
    }

    async waitForElement(locator: Locator) {
        await locator.waitFor();
    }
}
```

All page classes extend `BasePage`.

```ts
export class LoginPage extends BasePage {

    async login(username: string, password: string) {
        await this.fill(this.username, username);
        await this.fill(this.password, password);
        await this.click(this.loginButton);
    }
}
```

Here:

- `BasePage` contains common methods.
- Every page object inherits those methods.
- Child pages only implement page-specific functionality.

This follows the **Template Method Pattern**, where the base class provides the common template and child classes reuse or extend it.

---

## Key Points

- Behavioral Design Pattern.
- Common logic is written once in the base class.
- Child classes inherit and reuse the common functionality.
- Child classes implement only page-specific behavior.
- In automation frameworks, `BasePage` is a common example of the Template Method Pattern.
