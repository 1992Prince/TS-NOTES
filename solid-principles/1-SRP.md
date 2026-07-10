
# SOLID Principles

**SOLID** is a set of five object-oriented design principles that help us write code that is maintainable, scalable, reusable, and easy to test.

- SRP – Single Responsibility Principle
- OCP – Open/Closed Principle
- LSP – Liskov Substitution Principle
- ISP – Interface Segregation Principle
- DIP – Dependency Inversion Principle

---

# 1. Single Responsibility Principle (SRP)

### Definition

A class should have **only one reason to change**.

Instead of creating one large class that performs multiple tasks, we split responsibilities into separate classes so that each class focuses on **one specific responsibility**.

This improves:

- Maintainability
- Readability
- Testability
- Reusability

---

## ❌ Violation of SRP

Suppose we have a `Login` class that:

- Performs login
- Takes screenshots
- Writes logs
- Reads Excel data
- Sends email reports

```ts
class Login {

    async login(page) {
        // Enter username/password
    }

    async takeScreenshot(page) {
        // Capture screenshot
    }

    async writeLogs(message) {
        // Write logs
    }

    async readExcel() {
        // Read test data
    }

    async sendEmail() {
        // Send execution report
    }
}
```

This class has multiple responsibilities.

If tomorrow:

- Logging implementation changes ➜ `Login` class changes.
- Screenshot implementation changes ➜ `Login` class changes.
- Excel library changes ➜ `Login` class changes.
- Email reporting changes ➜ `Login` class changes.

Since the class has multiple reasons to change, it **violates SRP**.

---

## ✅ Following SRP

Split responsibilities into dedicated classes.

- `LoginPage` → Login functionality
- `Logger` → Logging
- `ScreenshotUtil` → Screenshot handling
- `ExcelReader` → Reading test data
- `EmailReporter` → Sending execution reports

Now each class has only **one responsibility**.

---

## How We Use SRP in Our Automation Framework

In our Playwright framework, we follow the **Page Object Model (POM)**.

- Every application page is represented by a separate TypeScript class (e.g., `LoginPage`, `HomePage`, `CartPage`).
- Each page class contains only page-specific actions and locators.
- Utility classes handle common responsibilities like:
  - Reading test data
  - Writing logs
  - Taking screenshots
  - Reading configuration
  - Generating reports
- Common page functionalities are kept in the `BasePage` class.

This ensures every class has a single responsibility, making the framework easier to maintain, extend, and test.

---

## Interview Answer (30–45 seconds)

**Single Responsibility Principle states that a class should have only one reason to change. In our Playwright framework, we apply this by keeping each page responsible only for page interactions, while utilities like Logger, ExcelReader, ScreenshotUtil, and ReportManager handle their own responsibilities. This separation improves maintainability, readability, reusability, and makes future changes easier without affecting unrelated code.**
