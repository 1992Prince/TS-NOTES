
# TypeScript Interview Questions (Automation Engineer)

---

# 1. OOP (Object-Oriented Programming)

### 1. What is OOP?

OOP (Object-Oriented Programming) is a programming paradigm that organizes code into objects containing properties and methods. It improves code reusability, maintainability, scalability, and security.

---

### 2. What are the four pillars of OOP?

- Encapsulation
- Inheritance
- Polymorphism
- Abstraction

---

### 3. How have you used OOP in your Playwright framework?

- **Classes** → BasePage, LoginPage, HomePage
- **Inheritance** → All pages extend BasePage
- **Polymorphism** → Method overriding (e.g., `isAt()`)
- **Abstraction** → Abstract BasePage and Interfaces
- **Encapsulation** → Using access modifiers (public/protected/private)

---

# 2. Class, Constructor & this

### 1. What is a Class?

A class is a blueprint for creating objects. It defines the properties and methods that objects will have.

---

### 2. What is an Object?

An object is an instance of a class created using the `new` keyword.

---

### 3. What is a Constructor and its purpose?

A constructor is a special method that is automatically called when an object is created using the `new` keyword. Its purpose is to initialize the object's properties.

---

### 4. What is the purpose of `this`?

`this` refers to the current object. It is used to access the current object's properties and methods.

---

### 5. Why do we write `this.name = name`?

`this.name` refers to the object's property, while `name` is the constructor parameter. It assigns the parameter value to the object's property.

---

### 6. What are the different kinds of constructors?

- Default Constructor
- Parameterized Constructor
- Constructor Overloading (using overload signatures with one implementation)

### 7. Do Typescript supports constructor overloading?
**Yes, but with a limitation.**

TypeScript supports **constructor overload signatures**, but it allows **only one constructor implementation**.

Example:

```typescript
class Employee {

    name: string = "";

    constructor();
    constructor(name: string);

    constructor(name?: string) {
        if (name) {
            this.name = name;
        }
    }
}
```

❌ TypeScript does **not** allow multiple constructor implementations like Java or C++.

---

# 3. Inheritance, super & this

### 1. What is Inheritance?

Inheritance is an OOP concept where a child class inherits the properties and methods of a parent class using the `extends` keyword.

---

### 2. What are the benefits of Inheritance?

- Code Reusability
- Avoids Duplication
- Easy Maintenance
- Better Code Organization

---

### 3. How have you implemented Inheritance in your framework?

`BasePage` contains common methods like `navigate()`, `takeScreenshot()`, etc. All page classes such as `LoginPage` and `HomePage` extend `BasePage` and inherit these methods.

---

### 4. What are the different types of Inheritance?

Supported:

- Single Inheritance
- Multilevel Inheritance
- Hierarchical Inheritance

Not Supported:

- Multiple Inheritance

---

### 5. What is Method Overriding?

Method overriding means providing a new implementation of an inherited method in the child class.

---

### 6. Which method have you overridden in your framework?

The `isAt()` method in each page class is overridden to perform page-specific validation.

---

### 7. What is Upcasting?

Upcasting means storing a child object in a parent class reference.

```typescript
BasePage page = new LoginPage();
```

Only parent methods are accessible, but overridden methods execute from the child class at runtime.

---

### 8. What is Downcasting?

Downcasting means converting a parent reference back to a child reference to access child-specific members.

TypeScript doesn't support traditional downcasting. Instead, it provides type assertion (`as`).

---

### 9. What is the purpose of `super`?

`super()` calls the parent class constructor and is used to initialize parent class properties.

---

### 10. Difference between `this` and `super`?

- `this` refers to the current object.
- `super` refers to the parent class.

### 11. Does TypeScript support Method Overloading?

- Not exactly. Unlike Java, TypeScript does not allow multiple implementations. It supports overload signatures, but there must be only one actual implementation that handles all cases

```typescript
class Calculator {

    add(a: number, b: number): number;
    add(a: string, b: string): string;

    add(a: any, b: any): any {
        return a + b;
    }
}
```

Usage:

```typescript
const calc = new Calculator();

calc.add(10, 20);      // 30
calc.add("A", "B");    // AB
```

The compiler selects the appropriate overload based on the arguments, but internally all calls execute the single implementation.

---

# 4. Interface & Interface Upcasting

### 1. What is an Interface?

An interface is a contract that defines the properties and methods a class must implement.

---

### 2. Why do we use Interfaces?

- Define a common contract
- Achieve abstraction
- Maintain coding standards
- Support multiple inheritance

---

### 3. What can an Interface contain?

- Property declarations
- Method declarations

---

### 4. Can an Interface have implementation?

No.

Interfaces contain only declarations.

---

### 5. Can we create an object of an Interface?

No.

Interfaces are incomplete contracts.

---

### 6. What is the purpose of `implements`?

`implements` is used by a class to follow the contract defined by an interface.

---

### 7. Can one Interface extend another Interface?

Yes.

An interface can extend one or more interfaces.

---

### 8. Can a class implement multiple interfaces?

Yes.

A class can implement any number of interfaces.

---

### 9. Can a class extend one class and implement multiple interfaces?

Yes.

```typescript
class LoginPage extends BasePage implements ILogger, IScreenshot
```

---

### 10. What is Interface Upcasting?

Interface upcasting means storing an object in an interface reference.

```typescript
const page: IBasePage = new LoginPage();
```

Only methods declared in the interface are accessible.

---

### 11. Why do we use Interface references?

They promote:

- Loose Coupling
- Better Abstraction
- Easy Replacement of Implementations

---

# 5. Abstract Class & Abstraction

### 1. What is an Abstract Class?

An abstract class is a partially implemented class that serves as a blueprint for child classes.

---

### 2. Why do we use Abstract Classes?

To provide common implementation while forcing child classes to implement specific methods.

---

### 3. Can we create an object of an Abstract Class?

No.

An abstract class is incomplete.

---

### 4. What can an Abstract Class contain?

- Properties
- Constructors
- Normal methods
- Abstract methods

---

### 5. Is it mandatory for an Abstract Class to have abstract methods?

No.

It may contain:

- Only abstract methods
- Only normal methods
- Both

---

### 6. What happens if a child class doesn't implement all abstract methods?

The child class must also be declared `abstract`.

---

### 7. What is the difference between an Abstract Class and an Interface?

- Abstract class can have both normal and abstract methods, whereas an interface can have only method/property declarations.
- Abstract class is declared using the `abstract` keyword, whereas an interface uses the `interface` keyword.
- Child classes use `extends` for abstract classes, while classes use `implements` for interfaces.
- Abstract classes can have constructors; interfaces cannot.
- A class can extend only one abstract class but implement multiple interfaces.
- Use an abstract class for shared implementation and an interface for defining a contract.

---

### 8. If we can't create an object of an Abstract Class, then why do we have a constructor?

The constructor of an abstract class is executed when a child class object is created. It initializes the parent part of the child object.

---

### 9. What is an Abstract Method?

An abstract method is a method with only a declaration and no implementation. It must be implemented by the child class.

---

### 10. What is Abstraction?

Abstraction is the process of hiding implementation details and exposing only the required functionality.

---

### 11. How have you achieved Abstraction in your framework?

By using:

- Abstract Classes
- Interfaces

For example, `BasePage` provides common methods like `navigate()` while forcing every page to implement `isAt()`.

---

### 12. How can we achieve 100% Abstraction?

Using **Interfaces**, because they contain only declarations and no implementation.

---

# 6. Access Modifiers

### 1. What are Access Modifiers?

Access modifiers control the visibility of properties and methods.

TypeScript provides:

- public
- protected
- private

---

### 2. What is the default access modifier?

`public`

---

### 3. Difference between Public, Protected and Private?

- **public** → Accessible from anywhere.
- **protected** → Accessible within the class and child classes only.
- **private** → Accessible only within the same class.

---

### 4. When do you use Public in your framework?

For page methods that test classes call directly.

Examples:

- `login()`
- `navigate()`
- `searchProduct()`

---

### 5. When do you use Protected in your framework?

For reusable helper methods shared across page classes but hidden from test classes.

Examples:

- `waitForPageLoad()`
- `click()`
- `fill()`
- `waitForSpinner()`

---

### 6. When do you use Private?

For methods or variables that should be accessible only inside the same class.

---

### 7. Can a child class access Private members?

No.

---

### 8. Can a child class access Protected members?

Yes.

---

### 9. Which access modifier is most commonly used in Playwright frameworks?

- **public** → Page actions exposed to tests.
- **protected** → BasePage helper methods.
- **private** → Internal implementation details.

---

# 7. Common Framework-Based OOP Questions

### 1. Why is `BasePage` usually made abstract?

Because it contains common functionality while forcing every page to implement page-specific methods like `isAt()`.

---

### 2. Why do we keep common methods in `BasePage`?

To avoid code duplication and improve maintainability.

---

### 3. Why do we override `isAt()` in every page?

Every page has different validation logic, so each page provides its own implementation.

---

### 4. Why do we use Interfaces in automation frameworks?

To enforce coding standards and ensure every page or component implements required methods.

---

### 5. When would you choose an Interface over an Abstract Class?

Choose an **Interface** when you only need a contract.

Choose an **Abstract Class** when child classes should also inherit common implementation.

---

### 6. Which OOP concepts are used most in Playwright frameworks?

- Classes
- Objects
- Constructors
- Inheritance
- Method Overriding
- Interfaces
- Abstract Classes
- Abstraction
- Encapsulation (Access Modifiers)
