
## Fluent Interface Pattern

### Interview Definition

> **Fluent Interface is a design style in which each method returns the current object (`this`), allowing multiple method calls to be chained together. It improves code readability and provides a more natural way to write code.**

---

### Why are we using `return this`?

Notice every setter method returns `this`.

```ts
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
```

Returning `this` means each method returns the current `UserBuilder` object.

So, after one method finishes, we can immediately call another method on the same object.

This is called **method chaining**.

Example:

```ts
const requestBody = new UserBuilder()
    .setName("Prince")
    .setEmail("prince@test.com")
    .setJob("QA Engineer")
    .build();
```

Without returning `this`, we would have to write:

```ts
const builder = new UserBuilder();

builder.setName("Prince");
builder.setEmail("prince@test.com");
builder.setJob("QA Engineer");

const requestBody = builder.build();
```

Both produce the same result, but the first approach is much cleaner and easier to read.

---

## Builder + Fluent Interface

In our example:

- **Builder Pattern** helps create the request object step by step.
- **Fluent Interface** allows those steps to be chained together using `return this`.

These two patterns are commonly used together.

Builder focuses on **how the object is created**, while Fluent Interface focuses on **making the API easy and readable to use**.

---

## Where else is Fluent Interface used?

You'll see it in many JavaScript/TypeScript libraries:

```ts
new UserBuilder()
    .setName("Prince")
    .setEmail("prince@test.com")
    .build();
```

```ts
page.locator("#username")
    .fill("Prince");
```

```ts
expect(response)
    .toBeOK();
```

Whenever methods return the same object so that another method can be called immediately, it is an example of a **Fluent Interface**.
