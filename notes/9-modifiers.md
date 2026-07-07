
# Access Modifiers in TypeScript

Access modifiers control **where a property or method can be accessed**.

TypeScript provides three access modifiers:

- `public` (default)
- `protected`
- `private`

---

## 1. Public (Default)

`public` members can be accessed from **anywhere**.

- Inside the same class ✅
- Inside child classes ✅
- Outside the class using object ✅

If no access modifier is specified, it is **public** by default.

Example:

```typescript
class BasePage {

    public pageName = "Base Page";

    navigate() {
        console.log("Navigating...");
    }
}

const page = new BasePage();

console.log(page.pageName);
page.navigate();
```

Output:

```
Base Page
Navigating...
```

This is why most page methods like `navigate()`, `login()`, `click()`, etc., are public.

---

## 2. Protected

`protected` members can be accessed:

- Inside the same class ✅
- Inside child classes ✅
- Outside the class ❌

Example:

```typescript
class BasePage {

    protected pageTitle = "Base Page";

    protected waitForPageLoad() {
        console.log("Waiting for page load...");
    }
}

class LoginPage extends BasePage {

    verifyPage() {

        console.log(this.pageTitle);

        this.waitForPageLoad();
    }
}

const page = new LoginPage();

// page.pageTitle;          ❌
// page.waitForPageLoad();  ❌
```

Protected members are mainly used when they are required only by child classes and should not be exposed to test classes.

---

## Framework Example

```typescript
class BasePage {

    protected waitForPageLoad() {
        console.log("Waiting...");
    }
}

class LoginPage extends BasePage {

    login() {

        this.waitForPageLoad();

        console.log("Logging In");
    }
}
```

The test can call:

```typescript
loginPage.login();
```

But it cannot directly call:

```typescript
loginPage.waitForPageLoad(); ❌
```

This hides internal framework methods from the test layer.

---

## 3. Private

`private` members can be accessed **only inside the same class**.

They cannot be accessed:

- From child classes ❌
- From outside the class ❌

Example:

```typescript
class BasePage {

    private browserName = "Chrome";

    private launchBrowser() {
        console.log("Launching Browser");
    }

    openApplication() {

        console.log(this.browserName);

        this.launchBrowser();
    }
}

class LoginPage extends BasePage {

    login() {

        // this.browserName;      ❌

        // this.launchBrowser();  ❌
    }
}

const page = new LoginPage();

// page.browserName;     ❌

// page.launchBrowser(); ❌
```

Private members are completely hidden from child classes and outside code.

---

# Comparison

| Modifier  | Same Class | Child Class | Outside Class |
| --------- | ---------- | ----------- | ------------- |
| public    | ✅         | ✅          | ✅            |
| protected | ✅         | ✅          | ❌            |
| private   | ✅         | ❌          | ❌            |

---

# Real Framework Example

```typescript
class BasePage {

    public navigate() {}

    protected waitForPageLoad() {}

    private initializeBrowser() {}
}

class LoginPage extends BasePage {

    login() {

        navigate();              // ✅

        this.waitForPageLoad();  // ✅

        // this.initializeBrowser(); ❌
    }
}

const page = new LoginPage();

page.navigate();          // ✅

// page.waitForPageLoad(); // ❌

// page.initializeBrowser(); // ❌
```

---

# Which modifier should we use in automation frameworks?

- **public** → Methods used by test classes (`login()`, `navigate()`, `searchProduct()`).
- **protected** → Internal helper methods shared with child pages (`waitForPageLoad()`, `click()`, `fill()`, `waitForSpinner()`).
- **private** → Methods or variables used only inside the current class.

---

# Interview Questions

### 1. What are Access Modifiers?

Access modifiers control the visibility of properties and methods. TypeScript provides three access modifiers: `public`, `protected`, and `private`.

---

### 2. What is the default access modifier in TypeScript?

`public` is the default access modifier.

```typescript
class Employee {

    name: string;    // public by default
}
```

The above is equivalent to:

```typescript
class Employee {

    public name: string;
}
```

---

### 3. Difference between Public, Protected and Private?

- **public** → Accessible from anywhere.
- **protected** → Accessible only inside the class and its child classes.
- **private** → Accessible only inside the same class.

---

### 4. When do you use Protected in your framework?

We use `protected` for common helper methods that should be shared with all page classes but should not be directly accessed by test classes.

Examples include:

- `waitForPageLoad()`
- `click()`
- `fill()`
- `waitForSpinner()`

---

### 5. When do you use Private?

We use `private` for methods or variables that are internal to a class and should not be accessible or modified by child classes or external code.

---

### 6. Can a child class access private members?

No.

Private members belong only to the class in which they are declared.

---

### 7. Can a child class access protected members?

Yes.

Protected members are accessible inside child classes but not from outside the class hierarchy.

---

### 8. Which modifier is used most in Playwright frameworks?

- **public** is used for page actions that tests call directly.
- **protected** is commonly used in `BasePage` for reusable helper methods.
- **private** is used less frequently and only for class-specific implementation details.
