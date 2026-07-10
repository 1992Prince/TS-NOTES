
# Builder Design Pattern

## Interview Definition

> **Builder Pattern is a Creational Design Pattern used to construct complex objects step by step. Instead of passing all values at once, the client gradually builds the object by calling methods and finally gets the completed object.**

## Why do we need Builder Pattern?

### In Java

- Java supports **constructor overloading**.
- We can create multiple constructors with different parameters.
- The client calls the constructor based on the properties they want to set.

Example:

```java
new User("Prince");
new User("Prince", "prince@test.com");
new User("Prince", "prince@test.com", "QA Engineer");
```

**Problems:**

- The class ends up having many overloaded constructors.
- If the object has many properties, constructors become very long.
- Maintaining multiple constructors becomes difficult.

---

### In TypeScript / JavaScript

- TypeScript **does not support constructor overloading** like Java.
- Usually, we create a single constructor with all properties.

Example:

```ts
new User(name, email, job, city, phone);
```

If some properties are not required, we still need to pass values like:

```ts
new User(
    "Prince",
    "prince@test.com",
    undefined,
    undefined,
    undefined
);
```

**Problems:**

- Constructor becomes large as the number of properties increases.
- We need to pass `undefined` or empty values for optional properties.
- Creating different variations of the same object becomes difficult.
- This makes object creation complex.

---

#### Builder Pattern solves this problem by allowing us to create the object **step by step**, setting only the required properties before calling `build()`.
---

## What is Builder Design Pattern?

Builder Pattern is a **Creational Design Pattern** used to **build complex objects step by step**.

Instead of creating an object in a single statement, the client gradually adds the required properties by calling different methods.

Finally, the builder returns the completed object.

> **The client decides what values to set, while the builder takes care of constructing the final object.**

---

## Purpose

- Build complex objects step by step.
- Improve readability.
- Avoid large constructors or objects with many parameters.
- Allow optional properties to be added easily.
- Make object creation cleaner and easier to maintain.

---

## Automation Framework Example

Suppose we need to send an API request with multiple fields.

Without Builder Pattern, we may directly create the request body like this:

```ts
const requestBody = {
    name: "Prince",
    email: "prince@test.com",
    job: "QA Engineer"
};
```

Instead, we create a **UserBuilder** class.

```ts
export class UserBuilder {

    private user = {};

    setName(name: string) {
        this.user["name"] = name;
        return this;
    }

    setEmail(email: string) {
        this.user["email"] = email;
        return this;
    }

    setJob(job: string) {
        this.user["job"] = job;
        return this;
    }

    build() {
        return this.user;
    }
}
```

Now the client builds the object step by step:

```ts
const requestBody = new UserBuilder()
    .setName("Prince")
    .setEmail("prince@test.com")
    .setJob("QA Engineer")
    .build();
```
Also if client want object with only name and then client can call only setName() method
and ignore setEmail and setJob and so obj created will have only name property.
Finally, pass it to Playwright:

```ts
await request.post("/users", {
    data: requestBody
});
```

### What does the client know?

- Create a `UserBuilder`.
- Call methods to set required fields.
- Call `build()`.
- A JavaScript object is returned.

### What is hidden from the client?

- How the object is constructed internally.
- How values are stored.
- How the final object is assembled.

The client only builds the object step by step.

> **Note:** `build()` returns a **JavaScript object**, not a JSON string. When this object is passed to `request.post()` using the `data` option, Playwright automatically serializes it into JSON before sending the HTTP request.

---

However, Builder Pattern is commonly used in automation frameworks to:

- Build API request payloads.
- Create test data.
- Build complex configuration objects.
- Create reusable request bodies.

It makes test code cleaner, more readable, and easier to maintain when request payloads contain many optional fields.

## Builder and Fluent pattern go together