
abstract class BasePage3 {

    abstract isAt(): boolean;

    navigate(url: string) {
        console.log(`Navigating to ${url}`);
    }

    takeScreenshot() {
        console.log("Taking Screenshot");
    }
}

class LoginPage3 extends BasePage3 {

    override isAt(): boolean {
        console.log("Checking Login Page");
        return true;
    }

    login() {
        console.log("Logging In");
    }
}


// object creation
const page: LoginPage3 = new LoginPage3();

page.navigate("https://example.com");
page.takeScreenshot();
page.isAt();
page.login();