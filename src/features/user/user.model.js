import { ApplicationError } from "../../error-handler/app-error.js";
const users = [
    {
        "id": 1,
        "name": "diwakar",
        "email": "dverma31896@gmail.com",
        "password": "diwakar123"
    },
    {
        "id": 2,
        "name": "test",
        "email": "test@gmail.com",
        "password": "123"
    },
    {
        "id": 3,
        "name": "test3",
        "email": "test3@gmail.com",
        "password": "1234"
    }
];
let id = 0;
class UserSchema {
    constructor(name, email, password) {
        this.id = ++id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
export const addUser = (data) => {
    const user = new UserSchema(data.name, data.email, data.password);
    users.push(user);
    return user;
};
addUser({ name: "diwakar", email: "dverma31896@gmail.com", password: "diwakar123" });

export const confirmLogin = (data) => {
    const { email, password } = data;
    const result = users.find(user => user.email === email && user.password === password);
    console.log(!result);
    if (!result) {
        throw new ApplicationError("User not found", 404);
    }
    else {
        return { "status": "success", "msg": "login successful", "id": result.id };
    }
};

export const getAllUsers = () => {
    return users;
};

