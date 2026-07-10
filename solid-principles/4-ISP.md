
# 4. Interface Segregation Principle (ISP)

### Definition

A class should **not be forced to implement methods it does not need**.

Instead of creating one large interface, split it into smaller, specific interfaces.

This improves:

- Maintainability
- Readability
- Flexibility

---

## ❌ Violation of ISP

Suppose we have one interface for all data operations.

```ts
interface IDataOperations {
    readData();
    writeData();
    deleteData();
}
```

Now we have an Excel reader class.

```ts
class ExcelReader implements IDataOperations {

    readData() {
        // Read Excel
    }

    writeData() {
        throw new Error("Not Supported");
    }

    deleteData() {
        throw new Error("Not Supported");
    }

}
```

Here, `ExcelReader` is forced to implement methods that it doesn't need.

❌ This violates ISP.

---

## ✅ Following ISP

Split the interface into smaller interfaces.

```ts
interface IDataReader {
    readData();
}

interface IDataWriter {
    writeData();
}
```

Now `ExcelReader` only implements `IDataReader`.

It is no longer forced to implement unnecessary methods.

---

## How We Use ISP in Our Automation Framework

Instead of creating one large interface containing multiple unrelated methods, we create small, focused interfaces based on responsibility.

For example:

- `IDataReader`
- `IDataWriter`
- `ILogger`
- `IScreenshot`

Each class implements only the interface it actually needs, making the framework cleaner and easier to maintain.
