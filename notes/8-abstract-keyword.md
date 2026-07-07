
# Abstract Class in TypeScript

## What is an Abstract Class?

An abstract class is a partially implemented class that acts as a blueprint for other classes.

It can contain:

- Abstract methods (without implementation)
- Normal methods (with implementation)
- Properties
- Constructors

An abstract class **cannot be instantiated** because it is incomplete. It must be extended by a child class.

> **Simple way to understand:**
>
> An abstract class is like a half-built `BasePage`. It provides common functionality to all page classes while forcing child classes to implement methods that are page-specific, such as `isAt()`.

---

## Creating an Abstract Class

```typescript
abstract class BasePage {

    navigate(url: string) {
        console.log(`Navigating to ${url}`);
    }

    takeScreenshot() {
        console.log("Taking Screenshot");
    }

    abstract isAt(): boolean;
}
```

Here,

- `navigate()` and `takeScreenshot()` are normal methods.
- `isAt()` is an abstract method.

An abstract method has **only declaration**, not implementation.

---

## Implementing Abstract Methods

A child class extends the abstract class and provides implementation for all abstract methods.

```typescript
class LoginPage extends BasePage {

    override isAt(): boolean {
        console.log("Checking Login Page");
        return true;
    }

    login() {
        console.log("Logging In");
    }
}
```

Object creation:

```typescript
const page = new LoginPage();

page.navigate("https://example.com");
page.takeScreenshot();
page.isAt();
page.login();
```

---

## Why is `BasePage` Abstract?

Some methods are common for every page.

For example:

- `navigate()`
- `takeScreenshot()`

But `isAt()` is different for every page.

Instead of providing a generic implementation, we force every page to implement its own version.

```typescript
class LoginPage extends BasePage {

    override isAt(): boolean {
        return true;
    }
}

class HomePage extends BasePage {

    override isAt(): boolean {
        return true;
    }
}
```

This ensures every page has its own page validation logic.

---

# Can We Create an Object of an Abstract Class?

No.

```typescript
const page = new BasePage(); ❌
```

Reason:

The class is incomplete because it contains abstract methods that have no implementation.

Similarly, we cannot create objects of interfaces.

```typescript
const obj = new IBasePage(); ❌
```

Both are incomplete blueprints.

---

# Rules of Abstract Classes

### 1. An abstract class cannot be instantiated.

```typescript
const page = new BasePage(); ❌
```

---

### 2. It must be extended.

```typescript
class LoginPage extends BasePage {

}
```

---

### 3. If a child class extends an abstract class, it must implement all abstract methods.

```typescript
class LoginPage extends BasePage {

    override isAt(): boolean {
        return true;
    }
}
```

Otherwise TypeScript gives an error.

---

### 4. If the child class does not implement abstract methods, it must also be declared abstract.

```typescript
abstract class LoginPage extends BasePage {

}
```

Another child class must then provide the implementation.

```typescript
class AdminLoginPage extends LoginPage {

    override isAt(): boolean {
        return true;
    }
}
```

---

### 5. An abstract class can have:

Only abstract methods

```typescript
abstract class A {

    abstract display(): void;
}
```

Only normal methods

```typescript
abstract class A {

    display() {
        console.log("Hello");
    }
}
```

Both abstract and normal methods (Most Common)

```typescript
abstract class BasePage {

    navigate() {}

    screenshot() {}

    abstract isAt(): boolean;
}
```

---

# Abstract Class vs Interface

| Abstract Class                             | Interface                                  |
| ------------------------------------------ | ------------------------------------------ |
| Uses`abstract class`                     | Uses`interface`                          |
| Can have implementation                    | Cannot have method implementation          |
| Can have abstract and normal methods       | Contains only method/property declarations |
| Can have constructors                      | Cannot have constructors                   |
| Cannot be instantiated                     | Cannot be instantiated                     |
| Extended using`extends`                  | Implemented using`implements`            |
| A class can extend only one abstract class | A class can implement multiple interfaces  |

---

# Framework Example

```typescript
abstract class BasePage {

    navigate(url: string) {
        console.log(`Navigating to ${url}`);
    }

    takeScreenshot() {
        console.log("Taking Screenshot");
    }

    abstract isAt(): boolean;
}

class LoginPage extends BasePage {

    override isAt(): boolean {
        console.log("Checking Login Page");
        return true;
    }

    login() {
        console.log("Login");
    }
}

class HomePage extends BasePage {

    override isAt(): boolean {
        console.log("Checking Home Page");
        return true;
    }

    searchProduct() {
        console.log("Searching Product");
    }
}
```

Common functionality stays in `BasePage`, while each page provides its own implementation of `isAt()`.

---

# Interview Questions

### 1. What is an Abstract Class?

An abstract class is a partially implemented class that serves as a blueprint for other classes. It can contain both implemented methods and abstract methods. It cannot be instantiated and must be extended by a child class.

---

### 2. Why do we use Abstract Classes in automation frameworks?

In Playwright frameworks, `BasePage` is often made abstract because it provides common methods like `navigate()` and `takeScreenshot()`, while forcing every page to implement its own `isAt()` method.

---

### 3. Can we create an object of an Abstract Class?

No.

An abstract class is incomplete because it may contain abstract methods without implementation.

---

### 4. What can an Abstract Class contain?

An abstract class can contain:

- Properties
- Constructors
- Normal methods
- Abstract methods

---

### 5. Is it mandatory for an Abstract Class to have abstract methods?

No.

An abstract class may contain:

- Only abstract methods
- Only normal methods
- A combination of both

---

### 6. What happens if a child class doesn't implement all abstract methods?

The child class must also be declared as `abstract`.

Otherwise, TypeScript reports a compile-time error.

---

### 7. What is the difference between an Abstract Class and an Interface?

| Abstract Class | Interface |
|----------------|-----------|
| Can have both **abstract methods** and **normal methods**. | Can contain only **method declarations** and **property declarations**. |
| Declared using the `abstract` keyword. | Declared using the `interface` keyword. |
| Child class inherits it using the `extends` keyword. | Class implements it using the `implements` keyword. |
| Can have constructors. | Cannot have constructors. |
| Can have method implementation. | Cannot have method implementation. |
| Can maintain state using properties. | Only defines the contract (properties and methods). |
| A class can extend only one abstract class. | A class can implement multiple interfaces. |
| Used when classes should share common implementation. | Used when multiple classes should follow the same contract. |

---

### 8. If we can't create an object of an Abstract Class, then why do we have a constructor?

The constructor of an abstract class is **not used to create objects of the abstract class itself**.

Instead, it is executed **when a child class object is created**.

Example:

```typescript
abstract class BasePage {

    page: string;

    constructor(page: string) {
        this.page = page;
    }
}

class LoginPage extends BasePage {

    constructor() {
        super("Login Page");
    }
}

const page = new LoginPage();
```

Execution Flow:

```
new LoginPage()
        ↓
LoginPage constructor
        ↓
super("Login Page")
        ↓
BasePage constructor executes
```

So, although we cannot instantiate `BasePage`, its constructor is used to initialize the parent part of every child object.

---

### 9. What is an Abstract Method?

An abstract method is a method that has **only a declaration and no implementation**.

It is declared using the `abstract` keyword and must be implemented by the child class.

Example:

```typescript
abstract class BasePage {

    abstract isAt(): boolean;
}
```

Implementation:

```typescript
class LoginPage extends BasePage {

    override isAt(): boolean {
        return true;
    }
}
```

An abstract method defines **what should be done**, while the child class decides **how it should be done**.

---

### 10. What is Abstraction? Explain with your framework.

**Definition:**

Abstraction is the process of hiding implementation details and exposing only the essential functionality to the user.

Users know **what a method does**, but they don't need to know **how it is implemented**.

---

**Framework Example**

Suppose our `BasePage` has the following method:

```typescript
navigate(url: string)
```

A test simply calls:

```typescript
loginPage.navigate("/login");
```

The test writer doesn't know or care that internally it might:

- Wait for the page to load
- Navigate to the URL
- Wait for network idle
- Verify the page is opened

All these implementation details are hidden inside the method.

Similarly, every page has its own implementation of:

```typescript
isAt()
```

The test simply calls:

```typescript
loginPage.isAt();
```

without knowing how the page validation is performed.

This is abstraction.

---

### 11. How can we achieve Abstraction in TypeScript?

We can achieve abstraction using:

- **Abstract Classes** ✅ (Most Common)
- **Interfaces** ✅

An **abstract class** achieves abstraction by using abstract methods along with common implemented methods.

An **interface** achieves **100% abstraction** because it contains only method/property declarations and no implementation.

> **Note:** In TypeScript, interfaces provide complete (100%) abstraction, whereas abstract classes provide partial abstraction because they can contain both implemented and abstract methods.