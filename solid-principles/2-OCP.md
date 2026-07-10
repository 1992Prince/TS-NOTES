
# 2. Open/Closed Principle (OCP)

### Definition

A class should be **open for extension but closed for modification**.

This means we should be able to add new functionality **without modifying existing, tested code**.

This improves:

- Maintainability
- Extensibility
- Reduces the risk of breaking existing functionality

---

## ❌ Violation of OCP

Suppose we have a `DataReader` utility class that reads test data from an Excel file.

Later, the requirement changes and the data source becomes a CSV file. We modify the same `DataReader` class by adding `if-else` conditions or creating another method to support CSV.

Again, in the future, if the data source changes to a database, we modify the same class once more.

Each new data source requires changing the existing class, which **violates the Open/Closed Principle**.

---

## ✅ Following OCP

Instead of modifying the same class, create a common interface, for example `IDataReader`, that defines the methods required to read data.

Different implementations can then be created for different data sources:

- `ExcelDataReader`
- `CsvDataReader`
- `JsonDataReader`
- `DbDataReader`

Each class implements the same interface but contains logic specific to its own data source.

Now, if a new data source is introduced, we simply create a new implementation without modifying any existing classes.

---

## How We Use OCP in Our Automation Framework

In our Playwright framework, we follow OCP by creating separate implementations for different data sources.

For example, we define a common `IDataReader` interface, and classes like `ExcelDataReader`, `CsvDataReader`, and `DbDataReader` implement it.

If tomorrow the test data source changes from Excel to a database, we simply create a new `DbDataReader` class. No existing reader classes or test scripts need to be modified.

This makes the framework easy to extend while keeping existing, tested code unchanged.
