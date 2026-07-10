
# Design Patterns Used in Our Selenium Framework vs Playwright Framework

In our previous **Java + Selenium** automation framework, we implemented several design patterns to solve common framework problems because Selenium provides only browser automation APIs and leaves most framework architecture to us.

In **Playwright**, many of these responsibilities are already handled internally by the framework. Features like **fixtures, browser lifecycle management, ES module caching, and dependency injection** reduce the need to manually implement some design patterns.

---

# Java + Selenium Framework

| Pattern                 | Category                                                       | Why We Used It                                                                                                   |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Singleton               | Creational                                                     | To ensure only one shared instance of utility classes, configuration classes, or managers was created.           |
| Factory                 | Creational                                                     | To create the browser (Chrome, Firefox, Edge, etc.) based on user input without exposing browser creation logic. |
| Builder                 | Creational                                                     | To build complex test data or request objects step by step.                                                      |
| Fluent Interface        | Behavioral (not a GoF pattern, but a widely used design style) | To create readable, chainable APIs such as API builders or request builders.                                     |
| Template Method         | Behavioral                                                     | To define common page operations in a Base Page while allowing child pages to implement their own behavior.      |
| Page Object Model (POM) | Architectural Pattern                                          | To separate page locators and page actions from test scripts for better maintainability.                         |

---

# Why These Patterns Were Needed in Selenium

Selenium mainly provides browser automation APIs. It does **not** provide:

- Browser lifecycle management
- Dependency injection
- Fixtures
- Test resource management
- Automatic object sharing

Therefore, we had to design these ourselves using design patterns.

---

# Playwright Framework

Playwright already provides many framework features that replace the need for certain design patterns.

## 1. Singleton Pattern

### In Selenium

We often implemented Singleton for:

- Browser Manager
- Configuration Manager
- Utility classes
- Shared services

### In Playwright

Usually **not required**.

**Reason:**

- ES modules are cached by Node.js, so imported modules behave like singletons within a worker process.
- Browser, Context, and Page are managed by Playwright fixtures.
- Fixtures automatically create, share, and clean up objects.

Therefore, instead of writing a Singleton class, we simply use:

- Built-in fixtures
- Custom fixtures
- Module exports

> **Recommendation:** Prefer Playwright fixtures over manually implementing Singleton.

---

## 2. Factory Pattern

### In Selenium

We created a Browser Factory.

```text
Chrome
Firefox
Edge

↓

BrowserFactory

↓

Returns requested browser
```

### In Playwright

Usually **not required**.

Playwright already provides browser launching APIs.

```ts
chromium.launch()
firefox.launch()
webkit.launch()
```

If browser selection is needed, Playwright configuration and projects handle it naturally.

Therefore, a custom Browser Factory is generally unnecessary.

---

## 3. Builder Pattern

### Still Used ✅

Builder remains very useful.

Examples:

- Test data builders
- API request builders
- Complex payload creation
- User object builders

Example:

```ts
new UserBuilder()
    .withName("John")
    .withEmail("john@test.com")
    .withRole("Admin")
    .build();
```

---

## 4. Fluent Interface Pattern

### Still Used ✅

Fluent APIs make code much more readable.

Example:

```ts
new APIRequestBuilder()
    .setBaseURL(url)
    .setHeader(token)
    .setBody(payload)
    .post();
```

This allows step-by-step object configuration using method chaining.

---

## 5. Template Method Pattern

### Still Used ✅

We still create a **BasePage** that contains common reusable functionality.

Example:

```text
BasePage
    ↓
LoginPage
HomePage
DashboardPage
```

Common methods like:

- click()
- fill()
- waitForElement()
- takeScreenshot()

are implemented once in the BasePage and reused by all page classes.

---

## 6. Page Object Model (POM)

### Still Used ✅

Playwright strongly encourages the use of Page Objects.

Each application page is represented by its own class.

Example:

```text
LoginPage
HomePage
DashboardPage
SettingsPage
```

Each page contains:

- Locators
- Page actions
- Business methods

Tests interact with page objects rather than directly with locators, improving readability and maintainability.

---

# Selenium vs Playwright

| Pattern           | Selenium           | Playwright            | Reason                                                                    |
| ----------------- | ------------------ | --------------------- | ------------------------------------------------------------------------- |
| Singleton         | ✅ Commonly used   | ❌ Usually not needed | ES module caching and fixtures manage shared objects.                     |
| Factory           | ✅ Browser Factory | ❌ Usually not needed | Browser creation is already handled by Playwright APIs and configuration. |
| Builder           | ✅ Yes             | ✅ Yes                | Useful for creating complex test data and request objects.                |
| Fluent Interface  | ✅ Yes             | ✅ Yes                | Improves readability with method chaining.                                |
| Template Method   | ✅ Yes             | ✅ Yes                | BasePage provides common functionality.                                   |
| Page Object Model | ✅ Yes             | ✅ Yes                | Keeps page logic separate from test logic.                                |

---

# Key Takeaway

Playwright doesn't eliminate design patterns—it eliminates the need to implement **certain infrastructure-related patterns** because the framework already provides those capabilities.

As a result:

- ❌ Singleton is usually replaced by **ES module caching and fixtures**.
- ❌ Factory is usually replaced by **Playwright's browser management and projects**.
- ✅ Builder is still valuable.
- ✅ Fluent Interface is still valuable.
- ✅ Template Method is still valuable.
- ✅ Page Object Model remains a best practice.

The general principle is:

> **Prefer Playwright's built-in features whenever they solve the problem. Apply design patterns only where they add value beyond what the framework already provides.**
