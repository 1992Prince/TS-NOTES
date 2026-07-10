
# Singleton Design Pattern

## Definition

The **Singleton Design Pattern** is a **Creational Design Pattern** that ensures **only one instance of a class exists** throughout the application and provides a **global access point** to that instance.

It is useful when multiple objects of the same class are unnecessary and a single shared instance is sufficient.

---

# Steps to Implement Singleton Pattern

## Step 1: Create a private static instance variable

This variable will hold the single instance of the class.

```ts
private static instance: Logger;
```

---

## Step 2: Make the constructor private

The constructor is marked as `private` so that **no one outside the class can create an object using the `new` keyword**.

```ts
private constructor() {}
```

Without a private constructor, anyone could do:

```ts
const logger = new Logger(); // ❌ Not allowed
```

This would defeat the purpose of Singleton.

---

## Step 3: Create a public static `getInstance()` method

This method is responsible for creating the object only once and returning the same object every time.

```ts
public static getInstance(): Logger {
    if (!Logger.instance) {
        Logger.instance = new Logger();
    }

    return Logger.instance;
}
```

- If an instance does not exist, it creates one.
- If an instance already exists, it simply returns the existing instance.

---

# Complete Example

```ts
class Logger {

    private static instance: Logger;

    private constructor(){}

    public static getInstance(): Logger{
        if(!Logger.instance){
            Logger.instance = new Logger();
        }

        return Logger.instance;
    }
}

let log1 = Logger.getInstance();
let log2 = Logger.getInstance();

console.log(log1 === log2); // true
```

---

# How It Works

### First Call

```text
Logger.getInstance()

↓

instance == undefined

↓

Create new Logger()

↓

Store in Logger.instance

↓

Return instance
```

### Second Call

```text
Logger.getInstance()

↓

instance already exists

↓

Return existing instance
```

No new object is created.

---

# Key Idea

The main purpose of Singleton is to ensure that **users cannot create multiple objects of the same class**.

Even if multiple parts of the application request an object, they all receive the **same existing instance** instead of creating a new one.

---

# Common Use Cases

Singleton is commonly used for shared objects such as:

- Logger
- Report Manager
- Configuration Manager
- Cache Manager
- Database Connection
- Shared Utility Services

These components generally require only one instance throughout the application.

---

# Thread Safety in Java

A common interview question is:

### Can Singleton break during parallel execution?

**Yes, in Java.**

Java applications can run multiple threads simultaneously.

Suppose two threads execute `getInstance()` at the same time:

```java
if(instance == null){
    instance = new Singleton();
}
```

Possible sequence:

```text
Thread A checks instance == null

↓

Before creating the object,
CPU switches to Thread B

↓

Thread B also checks instance == null

↓

Both threads create separate objects

↓

Singleton is broken
```

To prevent this, Java commonly uses the `synchronized` keyword:

```java
public static synchronized Singleton getInstance() {
    ...
}
```

`Synchronized` allows only one thread to execute the method at a time, preventing multiple instances from being created.

Other thread-safe approaches include Double-Checked Locking, `volatile`, eager initialization, and Enum Singleton.

---

# Why We Don't Use Singleton in Our Playwright Framework

In our Playwright framework, we generally **do not implement the Singleton pattern**.

### Reason 1: ES Modules are Cached

Since **ECMAScript 6 (ES6)**, every JavaScript/TypeScript file is treated as a module.

When a module is imported:

- It is loaded only once.
- Node.js caches it.
- Every subsequent import receives the same exported objects.

This behavior is already similar to a Singleton within a Node.js process.

Example:

```ts
// config.ts
export const config = {
    baseURL: "https://example.com"
};
```

Anywhere in the project:

```ts
import { config } from "./config";
```

Every file receives the same cached `config` object.

---

### Reason 2: Playwright Fixtures Already Manage Shared Objects

Playwright already provides built-in fixtures for:

- Browser
- BrowserContext
- Page

It also allows creating custom fixtures for shared services.

Fixtures automatically:

- Create objects
- Share them based on scope (test or worker)
- Handle setup
- Handle teardown

This removes the need for implementing Singleton for browser management.

---

### Reason 3: JavaScript Uses a Single-Threaded Execution Model

Unlike Java, JavaScript running in Node.js executes synchronous code on a **single thread** using the event loop.

The classic race condition during singleton initialization does not occur within a single Node.js process, so there is no need for a `synchronized` mechanism like Java.

---

### Reason 4: Playwright Parallel Execution Uses Workers

Although Playwright supports parallel execution, it does **not** use shared-memory threads like Java.

Instead, it creates **multiple Node.js worker processes**.

Each worker has:

- Its own memory
- Its own module cache
- Its own singleton instances

Therefore, a singleton is **per worker**, not shared globally across all workers.

---

# Interview Summary

- Singleton ensures only one instance of a class exists.
- It is implemented using:
  1. A private static instance variable.
  2. A private constructor.
  3. A public static `getInstance()` method.
- In Java, thread safety is important because multiple threads can create multiple instances simultaneously. This is commonly solved using `synchronized` or other thread-safe techniques.
- In Playwright with TypeScript, we usually don't implement Singleton because:
  - ES modules are cached by Node.js.
  - Playwright fixtures already manage object lifecycles.
  - JavaScript runs synchronously on a single thread within a process.
  - Parallel execution uses separate worker processes, each with its own memory and module cache.
- Therefore, in modern Playwright frameworks, it's generally better to use **ES modules and fixtures** instead of manually implementing the Singleton pattern.
