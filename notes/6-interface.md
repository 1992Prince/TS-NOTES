
# Interface in TypeScript

## What is an Interface?

An interface is a blueprint (contract) that defines **what a class should have**, but **not how it should implement it**.

> **Simple way to understand an Interface:**
>
> Think of an interface as a **contract**. Any class that signs this contract (implements the interface) **must implement all the properties and methods** defined in it.
>
> In automation frameworks, this helps enforce coding standards. For example, if every Page Object should have methods like `isAt()`, `takeScreenshot()`, or `log()`, we can define them in an interface. Any developer creating a new page (LoginPage, HomePage, CartPage, etc.) must implement these methods, ensuring all page objects follow the same structure and standards across the framework.

An interface can contain:

- Property declarations
- Method declarations

It **cannot contain method implementation**.

Unlike a class, we **cannot create an object** of an interface.

---

## Why do we use Interfaces?

- Define a common contract
- Achieve abstraction
- Ensure consistency across classes
- Solve the multiple inheritance limitation

---

## Creating an Interface

```typescript
interface IBasePage {

    pageName: string;

    navigate(url: string): void;

    isAt(): boolean;
}
```

Notice that methods only have signatures.

```typescript
navigate(url: string): void;
```

No implementation is provided.

---

## Implementing an Interface

A class implements an interface using the `implements` keyword.

```typescript
interface IBasePage {

    pageName: string;

    navigate(url: string): void;

    isAt(): boolean;
}

class LoginPage implements IBasePage {

    pageName = "Login Page";

    navigate(url: string): void {
        console.log(`Navigating to ${url}`);
    }

    isAt(): boolean {
        return true;
    }

    login(username: string, password: string) {
        console.log("Login Successful");
    }
}
```

The class **must implement all properties and methods** defined in the interface.

Otherwise TypeScript gives a compile-time error.

---

## Framework Example

In a Playwright framework, suppose every page should support navigation and page validation.

```typescript
interface IBasePage {

    navigate(url: string): void;

    isAt(): boolean;
}
```

Every page implements this contract.

```typescript
class LoginPage implements IBasePage {

    navigate(url: string): void {
        console.log("Navigate to Login");
    }

    isAt(): boolean {
        return true;
    }

    login() {}
}

class HomePage implements IBasePage {

    navigate(url: string): void {
        console.log("Navigate to Home");
    }

    isAt(): boolean {
        return true;
    }

    searchProduct() {}
}
```

Now every page is guaranteed to have `navigate()` and `isAt()` methods.

---

# Multiple Interfaces

One class can implement multiple interfaces.

```typescript
interface ILogger {

    log(message: string): void;
}

interface IScreenshot {

    takeScreenshot(): void;
}

class LoginPage implements ILogger, IScreenshot {

    log(message: string): void {
        console.log(message);
    }

    takeScreenshot(): void {
        console.log("Screenshot Taken");
    }

    login() {
        console.log("Login");
    }
}
```

A class implementing multiple interfaces must provide implementation for all methods.

---

# How Interfaces Solve Multiple Inheritance

TypeScript does **not** support multiple inheritance.

❌ Not Allowed

```typescript
class LoginPage extends BasePage, UtilityPage {

}
```

A class can extend **only one** class.

Instead, we use interfaces.

```typescript
interface ILogger {

    log(message: string): void;
}

interface IScreenshot {

    takeScreenshot(): void;
}

class LoginPage extends BasePage implements ILogger, IScreenshot {

    log(message: string): void {
        console.log(message);
    }

    takeScreenshot(): void {
        console.log("Screenshot");
    }
}
```

Here,

- `extends BasePage` → Inherits implementation from one parent class.
- `implements ILogger, IScreenshot` → Implements contracts from multiple interfaces.

This is how TypeScript solves the multiple inheritance problem.

---

# Interface Inheritance

One interface can extend another interface.

```typescript
interface IBasePage {

    navigate(url: string): void;
}

interface ILoginPage extends IBasePage {

    login(username: string, password: string): void;
}
```

Now `ILoginPage` contains:

- `navigate()`
- `login()`

A class implementing `ILoginPage` must implement both methods.

```typescript
class LoginPage implements ILoginPage {

    navigate(url: string): void {
        console.log(url);
    }

    login(username: string, password: string): void {
        console.log("Logged In");
    }
}
```

---

# Class extending a Class and implementing Multiple Interfaces

This is very common in real-world frameworks.

```typescript
interface ILogger {

    log(message: string): void;
}

interface IScreenshot {

    takeScreenshot(): void;
}

class BasePage {

    navigate(url: string) {
        console.log(url);
    }
}

class LoginPage
    extends BasePage
    implements ILogger, IScreenshot {

    log(message: string): void {
        console.log(message);
    }

    takeScreenshot(): void {
        console.log("Screenshot");
    }

    login() {
        console.log("Login");
    }
}
```

Rules:

- A class can extend **only one** class.
- A class can implement **multiple** interfaces.
- An interface can extend **one or more** interfaces.

---

# Interview Questions

### 1. What is an Interface?

An interface is a contract that defines what properties and methods a class must implement. It contains only declarations, not implementations.

---

### 2. What can an Interface contain?

An interface can contain:

- Property declarations
- Method declarations

It cannot contain method implementations.

---

### 3. Why do we use Interfaces?

- To define a common contract
- To achieve abstraction
- To ensure consistency across classes
- To support multiple inheritance through interfaces

---

### 4. What is the difference between `extends` and `implements`?

- `extends` is used for inheritance between classes or between interfaces.
- `implements` is used when a class follows the contract defined by an interface.

---

### 5. Can one interface extend another interface?

Yes.

```typescript
interface A {
    display(): void;
}

interface B extends A {
    print(): void;
}
```

The child interface inherits all members of the parent interface.

---

### 6. Can a class extend multiple classes?

No.

A class can extend only one class.

```typescript
class C extends A, B {} // ❌ Not Allowed
```

---

### 7. Can a class implement multiple interfaces?

Yes.

```typescript
class LoginPage implements ILogger, IScreenshot {

}
```

This is the recommended way to achieve multiple inheritance-like behavior in TypeScript.

---

### 8. Can a class extend one class and implement multiple interfaces?

Yes. This is very common in frameworks.

```typescript
class LoginPage
    extends BasePage
    implements ILogger, IScreenshot {

}
```

The class inherits implementation from `BasePage` while following the contracts defined by `ILogger` and `IScreenshot`.
