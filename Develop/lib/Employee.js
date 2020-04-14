// TODO: Write code to define and export the Employee class
class Employee {
    constructor(id, name, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.title = 'Employee';
    }

    // Methods
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return this.title;x
    }

}

module.exports = Employee; 