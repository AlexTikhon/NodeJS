export class User {
    constructor(userBody) {
        this.id = Math.round(Math.random() * 10000);
        this.login = userBody.login;
        this.password = userBody.password;
        this.age = Number(userBody.age);
        this.deleted = false;
    }
}