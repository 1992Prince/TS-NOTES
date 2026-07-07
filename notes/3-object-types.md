
# TypeScript Object Types — Full Notes (Point-wise)

## 1. What is an Object Type?

- An object type describes the **shape** of an object — what properties it must have and what type each property should be.

```typescript
let person: { name: string; age: number } = {
  name: "Rahul",
  age: 30,
};
```

- **Why it matters:** In plain JavaScript, objects are flexible — you can add/remove/change properties freely, which leads to runtime bugs. TypeScript's object types let the compiler catch mistakes before you run the code.

```typescript
let person: { name: string; age: number } = {
  name: "Rahul",
  age: "thirty", // ❌ Error: Type 'string' is not assignable to type 'number'
};
```

---

## 2. Ways to Define Object Types

### a) Inline Object Type

Quick, used for small/one-off cases.

```typescript
let user: { name: string; age: number } = {
  name: "Rahul",
  age: 30,
};
```

### b) Type Alias

Reusable name for a type.

```typescript
type User = { name: string; age: number };

let user1: User = { name: "Amit", age: 25 };
let user2: User = { name: "Sneha", age: 28 };
```

### c) Interface

Similar to type alias but supports declaration merging, preferred for OOP-style code.

```typescript
interface User {
  name: string;
  age: number;
}
let user: User = { name: "Priya", age: 22 };
```

- ✅ In all 3 ways, you **can change (reassign) property values** after creation — **unless** the property is marked `readonly`.

```typescript
user1.age = 26; // ✅ allowed, age is not readonly
```

---

## 3. Type vs Interface — Interview Angle

**Key differences:**

| Point                        | `type`                                       | `interface`                                          |
| ---------------------------- | ---------------------------------------------- | ------------------------------------------------------ |
| Extending                    | `&` intersection                             | `extends` keyword                                    |
| Declaration merging          | ❌ Not possible                                | ✅ Two declarations with same name auto-merge          |
| Can represent                | Objects, unions, tuples, primitives, functions | Mainly objects/classes                                 |
| Performance (large projects) | Slightly slower for deep unions                | Slightly better for object shapes (compiler optimized) |

**🗣️ Interview speaking line:**

> "Both `type` and `interface` can describe the shape of an object, so for simple object definitions they're interchangeable. The real difference shows up in two places: `interface` supports declaration merging — if I declare the same interface twice, TypeScript merges them into one — while `type` does not. And `type` can do things `interface` can't, like represent union types (`type Status = "pass" | "fail"`) or intersections. My general preference is: use `interface` when defining object shapes that might be extended later — like in a Page Object Model where a base page interface gets extended by specific pages — and use `type` when I need unions, tuples, or combining multiple types together."

### Extending type and interface

```typescript
// Using interface
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}
let d: Dog = { name: "Tommy", breed: "Labrador" };

// Using type (intersection)
type Animal2 = { name: string };
type Dog2 = Animal2 & { breed: string };
let d2: Dog2 = { name: "Rocky", breed: "Pug" };
```

### Declaration Merging — only in `interface`, not `type`

```typescript
interface Car {
  brand: string;
}
interface Car {
  model: string;
}
// Automatically merged into: { brand: string; model: string }
let myCar: Car = { brand: "Toyota", model: "Fortuner" };
```

> ⚠️ If you try this with `type`, TypeScript throws: `Duplicate identifier 'Car'` — merging is not allowed.

---

## 4. Optional Properties

- Use `?` when a property **may or may not exist**.

```typescript
type Employee = {
  name: string;
  age: number;
  department?: string; // optional
};

let e1: Employee = { name: "Kunal", age: 28 }; // ✅ valid, department missing
let e2: Employee = { name: "Neha", age: 30, department: "QA" }; // ✅ valid
```

---

## 5. Readonly Properties

- Once assigned, the value **can't be reassigned**.

```typescript
type Config = {
  readonly apiUrl: string;
  timeout: number;
};

let config: Config = { apiUrl: "https://api.test.com", timeout: 5000 };
config.timeout = 8000;      // ✅ allowed
config.apiUrl = "https://new.com"; // ❌ Error: Cannot assign to 'apiUrl' because it is a read-only property
```

---

## 6. Default Values in Object Properties — Do they exist?

- ❌ **No** — `type` and `interface` are purely **compile-time structures**. They only describe shape/type, they hold no runtime values, so they **cannot** have "default values" the way a class field or function parameter can.
- There's no syntax like:

```typescript
type Config = {
  timeout: number = 5000; // ❌ Not valid — error
};
```

- **How people simulate "defaults" for objects in practice:**

**Option 1 — Merge with a defaults object (most common):**

```typescript
type BrowserOptions = { headless: boolean; slowMo: number };

const defaultOptions: BrowserOptions = { headless: true, slowMo: 0 };

function launchBrowser(overrides: Partial<BrowserOptions> = {}) {
  const finalOptions = { ...defaultOptions, ...overrides };
  return finalOptions;
}

launchBrowser({ headless: false }); // slowMo defaults to 0
```

**Option 2 — Default values live on a `class` (classes *do* support default field values, unlike `type`/`interface`):**

```typescript
class Config {
  timeout: number = 5000; // ✅ default allowed in class
  apiUrl: string = "https://default.com";
}
const c = new Config();
console.log(c.timeout); // 5000
```

**🗣️ Interview speaking line:**

> "`type` and `interface` don't support default values because they only exist at compile-time — they get erased once the code compiles to JavaScript, so there's nothing to hold a runtime default. Default values are a *runtime* concept. If I need default values for an object, I either merge an `overrides` object with a `defaults` object using the spread operator, or if it fits the design, I use a `class`, since class fields can have defaults."

---

## 7. Nested Objects

```typescript
type Address = { city: string; pincode: number };

type Employee = {
  name: string;
  address: Address;
};

let emp: Employee = {
  name: "Arjun",
  address: { city: "Delhi", pincode: 110001 },
};
```

---

## 8. Index Signatures

- Used when you don't know property **names** in advance, only their pattern.

```typescript
type ScoreBoard = {
  [studentName: string]: number;
};

let scores: ScoreBoard = { Rahul: 95, Sneha: 88 };
scores["Priya"] = 90; // ✅ works dynamically
```

---

## 9. Utility Types

### `Record<K, V>`

Creates an object type where **keys are of type K** and **values are of type V**. Object can have multiple properties, but every key must follow type `K`, every value must follow type `V`.

```typescript
type Scores = Record<string, number>;
let marks: Scores = { math: 95, physics: 88 };
```

Keys can also be a **fixed union of string literals** instead of a generic `string`:

```typescript
type EnvUrls = Record<"dev" | "qa" | "prod", string>;
const urls: EnvUrls = {
  dev: "https://dev.app.com",
  qa: "https://qa.app.com",
  prod: "https://app.com",
};
```

### `Partial<T>` — makes all properties optional

```typescript
type User = { name: string; age: number };
type PartialUser = Partial<User>; // { name?: string; age?: number }
```

### `Required<T>` — makes all properties mandatory

```typescript
type Employee = { name: string; department?: string };
type FullEmployee = Required<Employee>; // department becomes mandatory
```

### `Readonly<T>` — makes all properties readonly

```typescript
type Config = { url: string; timeout: number };
const frozen: Readonly<Config> = { url: "x.com", timeout: 3000 };
// frozen.timeout = 5000; ❌ Error
```

### `Pick<T, Keys>` — select a subset of properties

```typescript
type User = { name: string; age: number; email: string };
type UserPreview = Pick<User, "name" | "email">;
```

### `Omit<T, Keys>` — everything except given properties

```typescript
type User = { name: string; age: number; password: string };
type SafeUser = Omit<User, "password">;
```

---

## 10. Functions — Mandatory, Optional & Default Parameters

### a) Mandatory (Required) Parameters

- By default, every function parameter is **mandatory** — you must pass it, or TypeScript throws an error.

```typescript
function login(username: string, password: string): void {
  console.log(`Logging in ${username}`);
}

login("admin");           // ❌ Error: Expected 2 arguments, but got 1
login("admin", "pass123"); // ✅ valid
```

### b) Optional Parameters

- Use `?` after the parameter name to make it optional.
- ⚠️ **Rule:** Optional parameters must come **after** mandatory ones.

```typescript
function createUser(name: string, age?: number): void {
  console.log(name, age);
}

createUser("Rahul");        // ✅ valid, age is undefined
createUser("Rahul", 30);    // ✅ valid
```

- Inside the function, an optional param without a value is `undefined`, so you often need a check:

```typescript
function createUser(name: string, age?: number): void {
  if (age !== undefined) {
    console.log(`${name} is ${age} years old`);
  } else {
    console.log(`${name}'s age not provided`);
  }
}
```

### c) Default Parameters

- Assign a default value directly in the signature using `=`.
- If the caller doesn't pass that argument (or passes `undefined`), the default is used.
- Default parameters are **automatically treated as optional** — you don't add `?` on top of them.

```typescript
function launchBrowser(browserName: string = "chromium", headless: boolean = true): void {
  console.log(`Launching ${browserName}, headless: ${headless}`);
}

launchBrowser();                       // Launching chromium, headless: true
launchBrowser("firefox");              // Launching firefox, headless: true
launchBrowser("webkit", false);        // Launching webkit, headless: false
launchBrowser(undefined, false);       // Launching chromium, headless: false ✅ default kicks in on `undefined`
```

### d) Combining Mandatory + Optional + Default in one function

```typescript
function runTest(
  testName: string,                 // mandatory
  environment: string = "qa",       // default
  retries?: number                  // optional
): void {
  console.log(`Running "${testName}" on ${environment}, retries: ${retries ?? 0}`);
}

runTest("Login Test");                     // Running "Login Test" on qa, retries: 0
runTest("Login Test", "prod");             // Running "Login Test" on prod, retries: 0
runTest("Login Test", "prod", 3);          // Running "Login Test" on prod, retries: 3
```

**Order rule:** mandatory params → default params → optional params (roughly). TypeScript enforces that a **required parameter can't come after an optional one**, but default parameters are more flexible since they can be "skipped" using `undefined`.

### e) Object Parameter with Optional + Default (very common pattern in automation)

Instead of many positional params, pass a single config object — more readable, and order doesn't matter.

```typescript
type LaunchOptions = {
  browser?: string;
  headless?: boolean;
  timeout?: number;
};

function launch({ browser = "chromium", headless = true, timeout = 30000 }: LaunchOptions = {}) {
  console.log(browser, headless, timeout);
}

launch();                              // chromium true 30000
launch({ browser: "firefox" });        // firefox true 30000
launch({ headless: false, timeout: 5000 }); // chromium false 5000
```

> This is called **destructuring with default values** — very common in Playwright/Cypress-style config functions, and a favorite interview follow-up to "how do you handle many optional config params?"

**🗣️ Interview speaking line:**

> "In TypeScript, function parameters are mandatory by default. I make a parameter optional using `?`, but it must come after all mandatory ones. If I want a fallback value when the caller doesn't pass anything, I use a default parameter with `=`, which TypeScript treats as optional automatically. In real projects — especially automation frameworks — instead of stacking many optional parameters, I prefer passing a single options object and destructuring it with default values, since it's more readable and the caller doesn't need to remember parameter order."

---

