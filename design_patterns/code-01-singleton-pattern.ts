class Logger {

    private static instance: Logger;

    private constructor(){}

    public static getInstance(): Logger{
        if(!Logger.instance){
            Logger.instance = new Logger();
        }

        return Logger.instance;
    }
}

let log1 = Logger.getInstance();
let log2 = Logger.getInstance();

console.log(log1 === log2); // true