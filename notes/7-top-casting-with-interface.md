
# Upcasting with Interface

An interface can also be used as the reference type, just like a parent class.

```typescript
interface IBasePage {

    navigate(url: string): void;

    isAt(): boolean;
}

class LoginPage implements IBasePage {

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

Instead of creating a reference of `LoginPage`, we can create a reference of the interface.

```typescript
const page: IBasePage = new LoginPage();
```

Here,

- Reference type = `IBasePage`
- Object type = `LoginPage`

This is similar to upcasting with classes.

Only the methods declared in the interface are accessible.

```typescript
page.navigate("https://example.com");
page.isAt();

// page.login("admin","123"); ❌ Not Allowed
```

Even though the reference type is `IBasePage`, the object created is `LoginPage`, so the `LoginPage` implementation of `navigate()` and `isAt()` is executed.

---

## Why do we use Interface References?

Using interface references provides **loose coupling**.

The calling code depends only on the interface, not on a specific implementation.

Suppose tomorrow you replace `LoginPage` with another implementation:

```typescript
class LoginPageV2 implements IBasePage {

    navigate(url: string): void {
        console.log("New Navigation");
    }

    isAt(): boolean {
        return true;
    }
}
```

The client code doesn't need to change.

```typescript
const page: IBasePage = new LoginPageV2();
```

Since both classes implement the same interface, they can be used interchangeably.

---

## Framework Example

```typescript
interface ILogger {

    log(message: string): void;
}

class ConsoleLogger implements ILogger {

    log(message: string): void {
        console.log(message);
    }
}

class FileLogger implements ILogger {

    log(message: string): void {
        console.log("Writing to file");
    }
}
```

Using interface reference:

```typescript
const logger: ILogger = new ConsoleLogger();

logger.log("Test Started");
```

Later, we can switch to another implementation without changing the calling code.

```typescript
const logger: ILogger = new FileLogger();

logger.log("Test Started");
```

This makes the framework flexible and easy to maintain.

---

# Interview Questions

### 1. Can we do upcasting using interfaces?

Yes.

An interface can be used as the reference type, while the object can be of any class implementing that interface.

```typescript
const page: IBasePage = new LoginPage();
```

---

### 2. What methods can we access?

Only the methods declared in the interface can be accessed using the interface reference.

Child class-specific methods cannot be accessed.

---

### 3. Why is interface upcasting useful?

It promotes:

- Loose coupling
- Better abstraction
- Easy replacement of implementations
- More maintainable and scalable code

This is widely used in dependency injection and framework design.
