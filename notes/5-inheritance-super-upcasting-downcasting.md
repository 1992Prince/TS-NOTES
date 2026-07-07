
# Inheritance in TypeScript

## What is Inheritance?

Inheritance is an OOP concept where a child class acquires the properties and methods of a parent class.

Benefits:

- Reuse common code
- Avoid code duplication
- Easy maintenance
- Child class can add its own functionality or override parent methods

In Playwright, `BasePage` acts as the parent class and all page classes (LoginPage, HomePage, CartPage, etc.) extend it.

```
          BasePage
             ▲
             │
         extends
             │
   -----------------------
   │          │          │
 LoginPage  HomePage  CartPage
```

`BasePage` contains common methods used by all pages.

```typescript
class BasePage {

    navigate(url: string) {
        console.log(`Navigating to ${url}`);
    }

    isAt() {
        console.log("Checking if we are at the correct page");
    }

    takeScreenshot() {
        console.log("Taking screenshot");
    }
}
```

Instead of writing these methods in every page, we write them once in `BasePage`.

---

Child class inherits all **public** and **protected** members of the parent class. It can also have its own methods and override inherited methods.

```typescript
class LoginPage extends BasePage {

    override isAt() {
        console.log("Checking if we are at Login Page");
    }

    login(username: string, password: string) {
        console.log(`Login with ${username}`);
    }
}
```

Creating object:

```typescript
const loginPage: LoginPage = new LoginPage();
```

- LHS (`loginPage`) → Reference variable
- RHS (`new LoginPage()`) → Object creation in heap memory

Calling methods:

```typescript
loginPage.navigate("https://example.com");
loginPage.isAt();
loginPage.takeScreenshot();
loginPage.login("admin","123");
```

Output:

```
Navigating...
Checking if we are at Login Page   // overridden method
Taking screenshot
Login with admin
```

`LoginPage` object can access:

- Parent class public/protected methods
- Its own methods

A parent object **cannot** access child-specific methods.

---

## Upcasting

```typescript
const page: BasePage = new LoginPage();
```

Here,

- Reference type = `BasePage`
- Object type = `LoginPage`

Only methods available in `BasePage` can be accessed.

```typescript
page.navigate("url");
page.isAt();
page.takeScreenshot();

// page.login(); ❌ Not allowed
```

Even though `isAt()` is called using a `BasePage` reference, the overridden method of `LoginPage` executes at runtime.

This is called **Runtime Polymorphism (Dynamic Method Dispatch).**

---

## Downcasting

TypeScript does not support traditional downcasting like Java.

It allows **type assertion**.

```typescript
const login = page as LoginPage;

login.login("admin", "123");
```

Type assertion only tells the compiler to treat the object as `LoginPage`. It does **not** perform runtime type checking.

---

# Inheritance with `super`

```typescript
class BasePage {

    page: string;

    constructor(page: string) {
        this.page = page;
    }

    isAt() {
        console.log(this.page);
    }
}

class HomePage extends BasePage {

    url: string;

    constructor(page: string, url: string) {

        super(page);      // calls parent constructor

        this.url = url;
    }
}
```

`super()` invokes the parent class constructor to initialize parent properties.

`this` refers to the current object.

---

# Interview Questions

### 1. What is inheritance? How have you implemented it in your framework?

Inheritance allows one class to inherit the properties and methods of another class using the `extends` keyword.

In our Playwright framework, `BasePage` is the parent class containing common methods like `navigate()`, `isAt()`, and `takeScreenshot()`. All page classes such as `LoginPage` and `HomePage` extend `BasePage`, which avoids code duplication and improves maintainability.

---

### 2. What are the different types of inheritance? Which one is not supported in TypeScript?

Supported:

- Single Inheritance
- Multilevel Inheritance
- Hierarchical Inheritance (multiple child classes extending the same parent)

Not Supported:

- Multiple Inheritance (a class cannot extend more than one class)

Example (Not Allowed):

```typescript
class C extends A, B {} ❌
```

---

### 3. What is Method Overriding?

Method overriding means providing a new implementation of an inherited method in the child class.

```typescript
override isAt() {
    console.log("Login Page");
}
```

At runtime, the child implementation is executed.

---

### 4. What is Upcasting?

Upcasting means storing a child object in a parent reference.

```typescript
const page: BasePage = new LoginPage();
```

Only parent methods are accessible, but overridden methods execute from the child class at runtime.

---

### 5. What is Downcasting? Is it supported in TypeScript?

Downcasting means converting a **parent class reference** back to a **child class reference** so that child-specific methods can be accessed.

Traditional downcasting is **not supported**.

TypeScript uses **type assertion**:

```typescript
const login = page as LoginPage;
```

This is a compile-time feature and does not perform runtime validation.

---

### 6. What is the purpose of `super`?

`super()` calls the parent class constructor.

It is used to initialize parent class properties before initializing child-specific properties.

---

### 7. `this` vs `super`

| this                                             | super                                         |
| ------------------------------------------------ | --------------------------------------------- |
| Refers to the current object                     | Refers to the parent class                    |
| Accesses current object's properties and methods | Accesses parent constructor or parent methods |
| Used in constructors and methods                 | Used only inside child classes                |
| Example:`this.page`                            | Example:`super(page)`                       |
