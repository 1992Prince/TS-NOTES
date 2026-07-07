
class BasePage2{

    page: string;

    constructor(page: string){
        this.page = page;
    }

    isAt(){
        console.log('I am at page: ' + this.page);
    }

    screenshot(){
        console.log('Taking screenshot of page: ' + this.page);
    }

}

class HomePage2 extends BasePage2{

    url: string;

    constructor(page: string, url: string){
        super(page);
        this.url = url;
    }

}

let lp2: HomePage2 = new HomePage2("Home Page", "https://example.com/home");
lp2.isAt();
lp2.screenshot();

//I am at page: Home Page
//Taking screenshot of page: Home Page