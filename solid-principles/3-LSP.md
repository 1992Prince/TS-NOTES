
## ✅ Liskov Substitution Principle (LSP)

A child class should **extend the parent's behavior, not change or break it**.

If a class inherits from `BasePage`, it should preserve the expected behavior of the parent class methods.

**Example:**

```ts
class BasePage {
    async click(locator) {
        await locator.click();
    }
}

class LoginPage extends BasePage {

    async click(locator) {
        console.log("Clicking Login button");
        await locator.click();
    }

}
```

Here, `LoginPage` overrides the `click()` method but **does not change its behavior**. It still performs the click operation and only adds additional logging.

✅ This follows **LSP**.

---

But if we do the following:

```ts
class LoginPage extends BasePage {

    async click(locator) {
        throw new Error("Click not supported");
    }

}
```

Now the `click()` method no longer performs the expected click operation. Instead, it throws an exception.

❌ This changes the behavior expected from the parent class and **violates LSP**.

---

**Key Point:**

LSP **allows method overriding**, but the overridden method should **preserve the behavior and contract of the parent class**. It can extend the functionality (e.g., add logging, retry logic, highlighting), but it should not break or completely change the expected behavior.
