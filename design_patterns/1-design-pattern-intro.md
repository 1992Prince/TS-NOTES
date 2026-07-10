
# Design Patterns

## 1. What are Design Patterns?

**Design Patterns** are **reusable, proven solutions to common software design problems**. They are not ready-made code but **best practices or templates** that help developers write code that is maintainable, scalable, reusable, and loosely coupled.

The **Gang of Four (GoF)** introduced **23 design patterns**, which are broadly categorized into **three types**:

1. **Creational Patterns**
2. **Structural Patterns**
3. **Behavioral Patterns**

---

# 2. Types of Design Patterns

## 1. Creational Design Patterns

### Definition

Creational patterns deal with **how objects are created**.

Instead of creating objects directly using the `new` keyword everywhere, these patterns provide better ways to create and manage objects. This helps improve flexibility, reduce unnecessary object creation, and make the application easier to maintain.

> **Why?**
>
> - Object creation can be expensive.
> - Some objects should be created only once.
> - Sometimes the object creation logic is complex.
> - We may want to hide the creation logic from the client.

### Patterns under Creational Design Patterns

| Pattern          | Purpose                                                            |
| ---------------- | ------------------------------------------------------------------ |
| Singleton        | Ensures only one instance of a class exists.                       |
| Factory Method   | Creates objects without exposing the creation logic to the client. |
| Abstract Factory | Creates families of related objects.                               |
| Builder          | Creates complex objects step by step.                              |
| Prototype        | Creates new objects by cloning existing ones.                      |

### Examples

- Browser Factory
- Configuration Manager (Singleton)
- Report Builder
- API Request Builder

---

## 2. Structural Design Patterns

### Definition

Structural patterns deal with **how classes and objects are organized and connected** to form larger structures.

These patterns help simplify relationships between classes, reduce coupling, improve flexibility, and make the system easier to extend without changing existing code.

> **Why?**
>
> - To organize classes efficiently.
> - To make existing classes work together.
> - To reduce dependencies.
> - To improve code reusability.

### Patterns under Structural Design Patterns

| Pattern   | Purpose                                                    |
| --------- | ---------------------------------------------------------- |
| Adapter   | Converts one interface into another compatible interface.  |
| Bridge    | Separates abstraction from implementation.                 |
| Composite | Treats individual objects and groups of objects uniformly. |
| Decorator | Adds new behavior to objects dynamically.                  |
| Facade    | Provides a simplified interface to a complex subsystem.    |
| Flyweight | Reduces memory usage by sharing common objects.            |
| Proxy     | Controls access to another object.                         |

### Examples

- Wrapping third-party APIs
- Logging decorators
- Facade for multiple services
- Proxy for lazy loading

---

## 3. Behavioral Design Patterns

### Definition

Behavioral patterns deal with **how objects communicate and interact with each other**.

They define responsibilities, communication, and the flow of control between objects, making the system more flexible and loosely coupled.

> **Why?**
>
> - To improve communication between objects.
> - To reduce tight coupling.
> - To make object interactions easier to manage.
> - To improve flexibility when business logic changes.

### Patterns under Behavioral Design Patterns

| Pattern                 | Purpose                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------- |
| Chain of Responsibility | Passes a request through a chain of handlers.                                      |
| Command                 | Encapsulates a request as an object.                                               |
| Interpreter             | Defines grammar and interprets language expressions.                               |
| Iterator                | Sequentially accesses elements of a collection.                                    |
| Mediator                | Centralizes communication between objects.                                         |
| Memento                 | Saves and restores an object's state.                                              |
| Observer                | Notifies multiple objects when one object changes.                                 |
| State                   | Changes object behavior based on its current state.                                |
| Strategy                | Encapsulates interchangeable algorithms.                                           |
| Template Method         | Defines the skeleton of an algorithm while allowing subclasses to customize steps. |
| Visitor                 | Adds new operations to existing object structures without modifying them.          |

### Examples

- Event listeners (Observer)
- Different payment methods (Strategy)
- Undo functionality (Memento)
- Request processing pipeline (Chain of Responsibility)

---

# Summary

| Category   | Focus                                | Number of GoF Patterns |
| ---------- | ------------------------------------ | ---------------------: |
| Creational | Object creation                      |                      5 |
| Structural | Object composition and relationships |                      7 |
| Behavioral | Object communication and behavior    |                     11 |

**Total GoF Design Patterns = 23**


