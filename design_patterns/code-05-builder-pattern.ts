class UserDetails{

    private user: any ={};

    setName(name: string){
        this.user['name'] = name;
        return this;
    }

    setEmail(email: string){
        this.user['email'] = email;
        return this;
    }

    setAge(age: number){
        this.user['age'] = age;
        return this;
    }

    setJobTitle(jobTitle: string){
        this.user['jobTitle'] = jobTitle;
        return this;
    }

    build(){
        return this.user;
    }
}

// object1 - user1 with all details
let user1 = new UserDetails().setName('John Doe')
                                    .setEmail('john.doe@example.com')
                                    .setAge(30)
                                    .setJobTitle('Software Engineer')
                                    .build();


// object2 - user2 with only name and age
let user2 = new UserDetails().setName('John Doe')
                                    .setAge(30)
                                    .build();

console.log(user1);
// {
//  name: 'John Doe',
//  email: 'john.doe@example.com',
//  age: 30,
//  jobTitle: 'Software Engineer'
//}


console.log(user2); // { name: 'John Doe', age: 30 }