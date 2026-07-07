
# Class, Constructor and `this` in TypeScript

Let's understand these concepts using a simple `Employee` class.

```typescript
class Employee {

    name: string;
    age: number;
    designation: string;

    constructor(name: string, age: number, designation: string) {
        this.name = name;
        this.age = age;
        this.designation = designation;
    }

    displayDetails() {
        console.log(`Employee Name: ${this.name}`);
        console.log(`Employee Age: ${this.age}`);
        console.log(`Employee Designation: ${this.designation}`);
    }
}

const emp1 = new Employee("John Doe", 30, "Software Engineer");
emp1.displayDetails();
```

Output:

```
Employee Name: John Doe
Employee Age: 30
Employee Designation: Software Engineer
```

---

## What is a Class?

A class is a blueprint or template for creating objects. It defines what properties (variables) and methods (functions) an object will have.

In the above example:

- `Employee` is the class.
- `name`, `age`, and `designation` are properties.
- `displayDetails()` is a method.
- `emp1` is an object (instance) of the `Employee` class.

Creating an object:

```typescript
const emp1 = new Employee("John Doe", 30, "Software Engineer");
```

---

## What is a Constructor?

A constructor is a special method of a class that is executed **automatically whenever an object is created using the `new` keyword**.

Its main purpose is to initialize the object's properties with the values passed while creating the object.

Example:

```typescript
constructor(name: string, age: number, designation: string) {
    this.name = name;
    this.age = age;
    this.designation = designation;
}
```

When this line executes:

```typescript
const emp1 = new Employee("John Doe", 30, "Software Engineer");
```

TypeScript automatically calls the constructor with these values:

```
name = "John Doe"
age = 30
designation = "Software Engineer"
```

The constructor then assigns these values to the newly created object.

---

## Interview Question: What is a Constructor and its Purpose?

**Answer:**

A constructor is a special method in a class that is automatically invoked when an object is created using the `new` keyword. Its primary purpose is to initialize the object's state by assigning values to its properties.

Without a constructor, we would have to assign every property manually after creating the object.

For example:

Without constructor:

```typescript
const emp = new Employee();

emp.name = "John";
emp.age = 30;
emp.designation = "QA Engineer";
```

With constructor:

```typescript
const emp = new Employee("John", 30, "QA Engineer");
```

The constructor makes object creation simpler, cleaner, and ensures the object starts in a valid state.

---

## What is `this`?

`this` is a keyword that refers to the **current object (current instance) of the class**.

Inside a class method or constructor, `this` is used to access the properties and methods of the object on which the method is being executed.

Example:

```typescript
this.name = name;
```

Here there are two different variables named `name`.

Left side:

```typescript
this.name
```

→ Property of the current object.

Right side:

```typescript
name
```

→ Constructor parameter.

So,

```typescript
this.name = name;
```

means

> Assign the constructor parameter `name` to the `name` property of the current object.

Similarly,

```typescript
this.age = age;
this.designation = designation;
```

---

## Why do we need `this`?

Suppose we write:

```typescript
name = name;
```

Here both `name` refer to the constructor parameter, so the object's property never gets updated.

That's why we write:

```typescript
this.name = name;
```

This clearly distinguishes the object's property from the local parameter.

The same applies inside methods:

```typescript
displayDetails() {
    console.log(this.name);
}
```

`this.name` accesses the name of the current object.

If two objects exist:

```typescript
const emp1 = new Employee("John", 30, "QA");
const emp2 = new Employee("David", 28, "Developer");
```

Then:

```
emp1.displayDetails()
```

prints John's details.

```
emp2.displayDetails()
```

prints David's details.

The value of `this` changes depending on which object calls the method.

---

## Interview Question: What is the purpose of `this`?

**Answer:**

`this` refers to the current instance of the class. It is used to access or modify the properties and methods of that specific object.

It is especially useful in constructors when constructor parameters have the same names as class properties. It removes ambiguity and ensures the values are assigned to the correct object.

---

## Types of Constructors in TypeScript

Unlike Java or C++, TypeScript supports **only one implementation of a constructor per class**.

However, from an interview perspective, constructors are commonly discussed in three categories.

But multiple constructors are not allowed in JS or TS.

### 1. Default Constructor

A constructor that takes no parameters.

```typescript
class Employee {

    constructor() {
        console.log("Employee object created");
    }
}
```

Purpose:

- Executes some initialization code.
- Creates an object with default values.

---

### 2. Parameterized Constructor

A constructor that accepts parameters to initialize the object.

```typescript
class Employee {

    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Purpose:

- Initializes the object with user-provided values.
- Most commonly used in real-world applications.

---

### 3. Constructor Overloading (TypeScript Way)

Unlike Java or C++, TypeScript **does not allow multiple constructor implementations**.

❌ Invalid:

```typescript
constructor() {}

constructor(name: string) {}
```

Instead, TypeScript allows **multiple constructor signatures (overload declarations)** but only **one implementation**.

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

Purpose:

- Supports different ways of creating objects while keeping a single constructor implementation.
- Less commonly used in automation frameworks than parameterized constructors.

---

## Interview Question: What are the different kinds of constructors?

**Answer:**

In TypeScript, every class can have only one constructor implementation.

Commonly discussed constructor types are:

- **Default constructor** – accepts no parameters and performs basic initialization.
- **Parameterized constructor** – accepts parameters to initialize object properties. This is the most commonly used type.
- **Constructor overloading** – TypeScript supports multiple constructor signatures but only one implementation, unlike Java or C++, which allow multiple constructor implementations.

---

## Key Interview Points

- A constructor is called automatically when an object is created using `new`.
- Every class can have only **one constructor implementation**.
- Constructors are primarily used to initialize object properties.
- `this` always refers to the current object.
- `this.property` accesses the object's property, while a parameter name refers to the local variable.
- TypeScript supports constructor overload signatures but not multiple constructor implementations.
- In automation frameworks like Playwright, constructors are commonly used to initialize objects such as the `Page` instance (you'll see this when learning dependency injection and inheritance).
