
# TypeScript Basic Types — Interview Notes

## 1. Primitive Types

### `string`

- Represents textual data.
- Declared with double quotes, single quotes, or backticks (template literals).

```ts
let name: string = "Sidharth";
```

### `number`

- Represents both integers and floating-point (decimal) numbers.
- TypeScript does not have separate `int` / `float` types like other languages.

```ts
let age: number = 34;
let price: number = 99.99;
```

### `boolean`

- Only two possible values: `true` or `false`.
- Commonly used for flags/conditions.

```ts
let isLoggedIn: boolean = true;
```

---

## 2. `any` vs `unknown` (a favorite interview topic)

### `any`

- Turns off type checking completely for that variable.
- You can assign any type to it, and call any method on it — TypeScript won't complain, even if it's wrong at runtime.
- Should be used sparingly (defeats the purpose of TypeScript).

```ts
let data: any = 42;
data = "hello";        // allowed
data.toUpperCase();    // allowed at compile time, but could crash at runtime if data isn't a string
```

### `unknown`

- The "type-safe" version of `any`.
- You can assign **any** value to an `unknown` variable — that part is identical to `any`.
- The difference shows up when you try to **use/consume** it: TypeScript forces you to narrow the type first (via `typeof`, `instanceof`, type guards) before performing any operations.

```ts
let value: unknown = "test";
value = 100;              // ✅ allowed — assignment is always safe
console.log(value);       // ✅ allowed — just printing, not treating it as a specific type

console.log(value.toUpperCase()); // ❌ Compile Error
// TypeScript doesn't know if `value` is a string at this point

if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ Safe — type narrowed to string
}
```

**Key interview line:**

> "`any` disables type checking entirely. `unknown` still requires you to prove the type before you can use it — assignment is unrestricted for both, but *usage* is restricted only for `unknown`."

| Aspect            | `any`             | `unknown`            |
| ----------------- | ------------------- | ---------------------- |
| Assign any value  | ✅                  | ✅                     |
| Use without check | ✅ (unsafe)         | ❌ (must narrow first) |
| Type safety       | None                | Safer                  |
| Recommended       | Avoid when possible | Preferred over`any`  |

---

## 3. `null` and `undefined`

- Both represent "absence of value."
- `undefined` — a variable has been declared but not yet assigned a value.
- `null` — an intentional/explicit "no value."

```ts
let a: undefined = undefined;
let b: null = null;
```

---

## 4. `void`

- Used as the return type of a function that does **not** return any value.

```ts
function logMessage(msg: string): void {
  console.log(msg);
}
```

## 5. `never`

- Represents a value that **never occurs**.
- Used for functions that always throw an error, or that have infinite loops (never reach a return statement).

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

> Interview distinction: `void` = "returns nothing," `never` = "never even completes/returns."

---

## 6. Object Type

- Represents any non-primitive value (objects, arrays, functions).

```ts
let user: object = { name: "Rahul" };
```

- In practice, you'd usually define a specific shape using an `interface` or `type` alias rather than the generic `object` type.

---

## 7. Array Types

Two equivalent ways to declare arrays:

```ts
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["Rahul", "Babita"];
```

- All elements must be of the same declared type.

```ts
console.log(names[0]); // "Rahul"
console.log(names[2]); // undefined (out of bounds, but no compile error for arrays)
```

---

## 8. Tuple Type

- A **fixed-length array** where each position has a **predefined, specific type**.
- Order and count matter.

```ts
let user: [string, number] = ["Rahul", 30];
let user2: [string, number, boolean] = ["Alice", 25, true];

console.log(user2[0]); // "Alice" -> string
console.log(user2[1]); // 25 -> number
console.log(user2[2]); // true -> boolean

// user2[3] -> ❌ Compile Error: Tuple of length 3 has no element at index 3
```

**Why use tuples?**

1. **Fixed structure data** — e.g., GPS coordinates:
   ```ts
   let coordinates: [number, number] = [28.6139, 77.2090];
   ```
2. **Returning multiple values from a function:**
   ```ts
   function getUser(): [string, number] {
     return ["Bob", 30];
   }
   const [name, age] = getUser(); // destructuring
   ```
3. **Heterogeneous data** in one fixed array (mixed types, unlike normal arrays).

**Array vs Tuple:**

| Feature             | Array                           | Tuple                                      |
| ------------------- | ------------------------------- | ------------------------------------------ |
| Length              | Flexible                        | Fixed                                      |
| Element types       | Usually same                    | Predefined per position                    |
| Example             | `let arr: number[] = [1,2,3]` | `let tup: [string, number] = ["id", 10]` |
| Out-of-range access | Silently`undefined`           | Compile-time error                         |

---

## 9. Enum Type

- Used to define a set of **named constants**, making code more readable than using raw numbers/strings.

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}

let move: Direction = Direction.Down;
console.log(move); // 1
```

- By default, enums are **numeric** and **auto-incremented starting from 0**:
  - `Up = 0, Down = 1, Left = 2, Right = 3`
- You can also assign **custom values**:

```ts
enum Direction {
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4
}
console.log(Direction.Down); // 2
console.log(Direction[2]);   // "Down" (reverse mapping, numeric enums only)
```

- You can also create **string enums** (no auto-increment, no reverse mapping, more readable in logs/debugging):

```ts
enum Status {
  Success = "SUCCESS",
  Failure = "FAILURE",
  Pending = "PENDING"
}
console.log(Status.Success); // "SUCCESS"
```

### Practical use in automation/SDET context — HTTP Status Codes

```ts
enum HttpStatus {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500
}

function validateResponse(statusCode: number) {
  if (statusCode === HttpStatus.OK) {
    console.log("Request successful ✅");
  } else if (statusCode === HttpStatus.NotFound) {
    console.log("Resource not found ❌");
  }
}

validateResponse(200); // Request successful ✅
```

- Instead of hardcoding magic numbers like `200` or `404` all over test scripts, SDETs reference `HttpStatus.OK` — improves readability and avoids typos.

### Practical use — Browser Enum (common in Selenium/Playwright automation frameworks)

```ts
enum Browser {
  Chrome = "chrome",
  Firefox = "firefox",
  Safari = "safari",
  Edge = "edge"
}

function launchBrowser(browserName: Browser) {
  console.log(`Launching ${browserName} browser...`);
  // switch-case or if-else to call actual driver setup, e.g. Playwright's browserType
}

launchBrowser(Browser.Chrome); // Launching chrome browser...
```

- This ensures only valid, predefined browser names can be passed into test configuration — prevents typos like `"chrom"` from silently breaking a test run.

---

## 10. Union Types

- Allows a variable to hold **more than one type**.

```ts
let x: string | number;
x = "Rahul"; // ✅
x = 120;     // ✅
```

- Useful when a value can legitimately be more than one type (e.g., an ID that could be a string or number).

---

## 11. Type Inference

- TypeScript can **automatically detect** the type of a variable from its assigned value, without an explicit annotation.

```ts
const name = "Sid";   // inferred as string
let score = 100;      // inferred as number

// name = 123; // ❌ Error — inferred type is locked in as string
```

- Best practice: let TypeScript infer types for simple/local variables, but explicitly annotate function parameters, return types, and object shapes for clarity and safer contracts.

---

## Interview Questions (Quick Fire)

1. **What is the difference between `any` and `unknown`?**

   - Both allow any value to be assigned, but `unknown` requires type narrowing before you can use/call methods on it, while `any` bypasses type checking entirely.
2. **What's the difference between `void` and `never`?**

   - `void` means a function returns nothing; `never` means the function never completes normally (throws an error or infinite loop).
3. **How is a tuple different from an array?**

   - Arrays have flexible length with (usually) the same type throughout; tuples have a fixed length with a specific type defined per position.
4. **Why would you use `unknown` instead of `any` in a real project?**

   - `unknown` forces developers to validate/narrow the type before using it, catching bugs at compile time instead of at runtime.
5. **What is type inference in TypeScript?**

   - TypeScript's ability to automatically determine a variable's type based on its assigned value, without needing an explicit type annotation.
6. **What are enums used for, and what's the difference between numeric and string enums?**

   - Enums define a set of named constants for readability. Numeric enums auto-increment from 0 and support reverse mapping; string enums require explicit values and don't support reverse mapping, but are more readable in logs.
7. **How would you use enums in a test automation framework?**

   - Example: an `HttpStatus` enum for asserting API response codes, or a `Browser` enum to restrict which browser names can be passed into test configuration — both prevent typos and magic numbers/strings.
8. **What happens if you access a tuple index beyond its defined length?**

   - TypeScript throws a compile-time error, unlike a regular array which would just return `undefined` at runtime.
9. **Can you reassign a different type to a variable declared with type inference?**

   - No — once TypeScript infers a type from the initial value, assigning a different type later results in a compile error.
10. **When would you choose a union type over `any`?**

    - When a variable can only be one of a *known, limited* set of types (e.g., `string | number`), a union type gives you type safety while still allowing flexibility — unlike `any`, which allows anything.
