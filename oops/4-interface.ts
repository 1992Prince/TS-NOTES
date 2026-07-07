
interface IUser {

    id: number;        // Property declaration
    name: string;      // Property declaration

    login(): void;     // Method declaration
}

class User implements IUser {
    
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    login(): void {
        console.log(`${this.name} has logged in.`);
    }
    
}