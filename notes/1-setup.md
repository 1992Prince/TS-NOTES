# TypeScript Notes for Automation Engineers

## 1. What is TypeScript?

- TypeScript is **not** a new language runtime.
- It's simply a **superset of JavaScript** — it adds extra tooling (type-checking) that runs *before* your actual code executes.
- End result: your TypeScript code still gets converted into plain JavaScript to run.

---

## 2. JS vs TS — Key Differences

### a) Typing: Dynamic vs Static

- **JavaScript**: Dynamically typed — a variable's type is decided at runtime and can change.

```
let x = 5;x = "hello"; // ✅ Allowed in JS
```
- **TypeScript**: Statically typed — you declare a type, and only that type of value can be stored. Wrong type = compile-time error.

```
let x: number = 5;x = "hello"; // ❌ Error in TS
```
- **Real-world impact**: Fewer bugs surface at runtime — TypeScript flags errors while you're writing the code, not after.

### b) Structure: Flexible vs Strict

- **JS**: Very flexible — you can create an object of any shape, anytime.
- **TS**: You must first define the object's structure using an `interface` or `type`, then create objects that match it.

```
interface User {  name: string;  age: number;}const u: User = { name: "A", age: 25 }; // ✅const u2: User = { name: "B" };         // ❌ Error, 'age' missing
```

### c) Compile-Time Checks

- **JS**: No compiler — errors only show up at runtime.
- **TS**: Has a compiler — errors are caught at compile time, before code ever runs.

### d) IDE Support (Autocomplete & IntelliSense)

- **JS**: Limited support out of the box; usually needs plugins for good IntelliSense.
- **TS**: Strong native IntelliSense — autocompletion, tooltips, and type hints work automatically.

### e) Type Safety

- **JS**: Not type-safe.
- **TS**: Type-safe by design.

### f) File Extensions & Execution

- **JavaScript**: `.js` files → run with `node filename.js`
- **TypeScript**: `.ts` files → run with `ts-node filename.ts`

- `ts-node` compiles TS → JS **in memory** and executes it directly (no separate output file created).

---

## 3. Prerequisites Before Adding TypeScript to a Project

1. Install **Node.js**
2. Use a code editor (recommended: **VS Code**)

### Setup Steps

```
# 1. Create a new project folder
mkdir my-ts-app && cd my-ts-app
npm init -y          # creates package.json

# 2. Install TypeScript locally (not globally)
npm install typescript --save-dev

# 3. Generate tsconfig.json (TS config file)
npx tsc --init

# 4. Install ts-node locally
npm install ts-node --save-dev
```

- After this, your `package.json` will show:

```
"devDependencies": {  "ts-node": "^10.9.2",  "typescript": "^6.0.3"}
```
- **ts-node** is required to run `.ts` files directly, instead of manually compiling with `tsc` and then running the resulting `.js` file.

### Running TS Files — Two Ways

1. **Direct run**: `ts-node file1.ts`
2. **Compile then run**:

```
tsc                 # compiles all .ts files → generates .js and .map filesnode file1.js       # then run the compiled JS
```

---

## 4. Global vs Local Installation

```
# Global install
npm install -g typescript      # verify: tsc -v
npm install -g ts-node         # verify: ts-node -v

# Local install (recommended)
npm install typescript --save-dev
npm install ts-node --save-dev
```

### Why Local Install is Preferred (Best Practice)

- Ensures the **same version** is used across all team members/projects.
- Doesn't require every teammate to install the package globally.
- Safer for **CI/CD pipelines** (no dependency on machine-level global installs).
- `npx` lets you run local tools as if they were global.

### When to Use Global Install

- Only for tools you use repeatedly **across many projects**, e.g.:

```
npm install -g nodemonnpm install -g typescript
```
- For team/shared projects → always prefer **local install + npx**.

---

## 5. Interview-Ready Answers (Point-wise)

## Q1: Difference between Local and Global Installation? Why is Local Preferred?

- **Global installation** means the package is installed at the system level, and it becomes available from **anywhere** on your machine, in any project, via the terminal.

- Syntax: `npm install -g typescript`
- Here `-g` = global flag.
- **Local installation** means the package is installed **inside your project folder only**, in its `node_modules`, and it's tied to that specific project.

- Syntax: `npm install typescript --save-dev` or short form `npm install typescript -D`
- `--save-dev` / `-D` means: save this package as a **dev dependency** — i.e., a tool needed only during development/testing, not required to run the app in production.
- **Why local is preferred:**

- Ensures the **same version** of the tool is used across all team members and environments — no version mismatch.
- Doesn't force every developer to install things globally on their own machine.
- Safer and more predictable for **CI/CD pipelines**, since the project carries its own tool versions.
- Keeps each project **isolated** — different projects can use different versions of the same tool without conflict.
- **Role of `npx`:**

- Since a locally installed package sits inside `node_modules/.bin` and isn't available directly in the terminal like a global command, we use `npx` to **run** it.
- `npx` = Node Package Executor — it looks inside your project's local `node_modules` first and runs the tool from there, without needing a global install.
- Example: if `typescript` is installed locally, running `tsc -v` directly may fail, but `npx tsc -v` works because npx finds it locally.
- **When to use global install:**

- Only for tools you use frequently across many unrelated projects, like `nodemon` or a personal utility CLI.
- For **team or shared projects**, always prefer **local install + npx** — this is the industry best practice.

---

## Q2: Explain the Steps of How TS Files Are Executed Internally

- We write our code in a `.ts` file inside the project.
- If the code doesn't follow proper TypeScript standards — say, wrong types or missing properties — the **TypeScript compiler (`tsc`) automatically does type-checking** and throws **compile-time errors**.

- This strict checking happens because `"strict": true` is set in `tsconfig.json`, and it's the `tsc` compiler enforcing these rules.
- Important point: **we cannot run `.ts` files directly.**

- Node.js runs on the **V8 engine**, and V8 only understands plain **JavaScript** — it has no idea what TypeScript syntax is.
- So the `.ts` file **must be converted to `.js`** before it can actually run.
- **Option 1 — Using `tsc` compiler:**

- Run `tsc` in the terminal.
- It compiles all `.ts` files into `.js` files (and also generates `.map` files for debugging/source-mapping).
- Then we manually run the generated file using `node filename.js`.
- **Option 2 — Using `ts-node` (recommended):**

- If `ts-node` package is installed, we can skip the manual two-step process.
- Just run: `ts-node filename.ts`
- Internally, `ts-node` still converts TS → JS, but it does this **compilation in memory** and immediately executes it — no separate `.js` file is generated on disk.
- This is faster and cleaner for development, which is why it's the recommended approach.

---

## Q3: `npm` vs `npx` — Difference and When to Use

- **npm (Node Package Manager):**

- Used to **install** packages — either globally on your system or locally inside your project.
- Global install example: `npm install -g typescript`
- Local install example: `npm install typescript --save-dev`
- In both cases, it's `npm` doing the downloading/installing — the difference is just *where* it installs the package.
- **npx (Node Package Executor):**

- Used to **run/execute** a package's CLI tool — especially ones installed **locally** inside your project's `node_modules`.
- A locally installed tool isn't directly available as a terminal command, so we need `npx` to find and run it from `node_modules/.bin`.
- Example: if `ts-node` is installed locally via `npm install ts-node --save-dev`, then to run it, open the terminal in the project folder and run:

```
npx ts-node file1.ts
```
- `npx` automatically looks into the project's local `node_modules`, finds `ts-node` there, and executes it.
- Bonus: these commands can also be added as **scripts inside `package.json`** for convenience (e.g., `"start": "ts-node file1.ts"`, then just run `npm run start`).
- **Simple rule of thumb:**

- **npm → to install** a package.
- **npx → to execute** a package's CLI, especially local ones, without needing a global install.

---

## Q4: What is `--save-dev` / `-D`? Where Does It Save the Package?

- In `package.json`, dependencies are split into two sections:

- **`dependencies`** → packages that the **application absolutely needs to run**, even in production (e.g., a library your app's core logic depends on, like `papaparse`).
- **`devDependencies`** → packages/tools needed only **during development or testing** (e.g., `typescript`, `ts-node`, `@playwright/test`, `allure-playwright`).
- When you install with `--save-dev` (or short flag `-D`), the package gets added under `devDependencies` in `package.json`.
- **Key point:** `devDependencies` packages are **not shipped to production** — they're stripped out when building/deploying the final production bundle, since they're only needed for coding/testing, not for the app to actually function.

Example:

```
"dependencies": {
  "papaparse": "^5.5.3"
},
"devDependencies": {
  "@faker-js/faker": "^10.5.0",
  "@playwright/test": "^1.61.1",
  "@types/node": "^26.1.0",
  "allure-commandline": "^2.43.0",
  "allure-playwright": "^3.10.2"
}
```

---

## Q5: If We Already Have `package.json`, What Is `package-lock.json` For?

- In `package.json`, dependency versions are usually written with a **`^`** symbol (caret) in front, like `"^10.5.0"`.

- The `^` means: this package **can automatically update** to newer **minor/patch versions** when someone runs `npm install` — it's not locked to that exact version.
- **Problem this causes:**

- Suppose you push your code with `"@faker-js/faker": "^10.5.0"`.
- Another teammate pulls the code and runs `npm install` later — by then a newer version like `10.6.0` or `10.7.2` might exist, and npm installs *that* instead.
- If that newer version has breaking changes, **the same codebase can now behave differently or break** on their machine, even though nobody changed the code.
- **Solution → `package-lock.json`:**

- This file **locks the exact, precise version** of every single package (and its sub-dependencies) that was actually installed at the time.
- When someone else clones the project and runs `npm install`, npm reads `package-lock.json` and installs the **exact same versions** — no surprises, no version drift.
- This is why real-world Node projects (like Playwright automation frameworks) always commit `package-lock.json` to version control — it guarantees **consistent, reproducible builds** across every machine and every team member.

**Q: What is `tsconfig.json`? Why generate it? What if you don't?**

- It's the TypeScript project configuration file — defines compiler behavior, strictness rules, source/output folders, etc.
- Generated via `npx tsc --init`.
- Without it, `tsc` will still work using default compiler settings, but you lose control over things like output directory, target JS version, strictness, and module system — harder to manage for real projects.

**Q: Explain key `tsconfig.json` components (from automation/setup perspective).**

- `compilerOptions` → main block containing all settings.
- `rootDir` → folder containing your source `.ts` files (e.g., `./src`).
- `outDir` → folder where compiled `.js` files go (e.g., `./dist`).
- `module` → module system to compile to (e.g., `nodenext`, `commonjs`).
- `strict` → enables all strict type-checking rules (recommended: `true`).
- Other useful options: `target` (JS version output), `sourceMap` (for debugging), `declaration` (generates `.d.ts` type files), `skipLibCheck` (speeds up compilation by skipping type checks on library files).

**Q: What is `tsc`?**

- `tsc` = TypeScript Compiler. It converts `.ts` files into plain `.js` files.
- You do **not** run `.ts` files directly in Node — Node only understands JS. So either:

- Compile first with `tsc`, then run the `.js` output with `node`, **or**
- Use `ts-node`, which compiles TS → JS **in memory** and runs it immediately — no visible `.js` file is created, but compilation still happens under the hood.
