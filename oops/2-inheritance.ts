
class BasePage{

    navigate(url: string){
        console.log(`Navigating to ${url}`);
    }

    isAt(){
        console.log(`Checking if we are at the correct page`);
    }

    takeScreenshot(){
        console.log(`Taking a screenshot of the page`);
    }
}

class LoginPage extends BasePage{

    override isAt(){
        console.log(`Checking if we are at the login page`);
    }

    login(username: string, password: string){
        console.log(`Logging in with username: ${username} and password: ${password}`);
    }
}

// object creation
let loginPage: LoginPage = new LoginPage();

// calling methods from the base class
loginPage.navigate("https://example.com/login");
loginPage.isAt();
loginPage.takeScreenshot();
loginPage.login("user123", "password123");

console.log();
console.log();

//output:
// Navigating to https://example.com/login
// Checking if we are at the login page
// Taking a screenshot of the page
// Logging in with username: user123 and password: password123



// Top Casting/Up-Casting [Child specfic methods will not be accessible]
let loginPage2: BasePage = new LoginPage();
loginPage2.navigate("https://example2.com/login");
loginPage2.isAt();
loginPage2.takeScreenshot();

console.log();
console.log();

// Navigating to https://example2.com/login
// Checking if we are at the login page
// Taking a screenshot of the page