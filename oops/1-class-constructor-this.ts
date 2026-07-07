

class Employee{

    name: string;
    age: number
    designation: string;

    constructor(name: string, age: number, designation: string){
        this.name = name;
        this.age = age;
        this.designation = designation;
    }

    displayDetails(){
        console.log(`Employee Name: ${this.name}`);
        console.log(`Employee Age: ${this.age}`);
        console.log(`Employee Designation: ${this.designation}`);
    }

}

let emp1: Employee = new Employee("John Doe", 30, "Software Engineer");
emp1.displayDetails();

//output:
// Employee Name: John Doe
// Employee Age: 30
// Employee Designation: Software Engineer