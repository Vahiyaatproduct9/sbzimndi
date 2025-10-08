export class User {
    name: string;
    age: number;
    instagram: string;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.instagram = 'kishor_dih'
    }
    writeName() {
        console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
    }
}
