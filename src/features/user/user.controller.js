import { addUser, confirmLogin, getAllUsers } from "./user.model.js";
import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js";


export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    updateUser = async (req, res) => {
        const id = req.params.id;
        const userData = req.body;
        const updateUser = await this.userRepository.updateOne(id, userData);
        res.status(200).send({ "status": "success", "user": updateUser });
    };

    getDetails = async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const getUser = await this.userRepository.getUser(id);
        if (getUser) {
            res.status(200).send({ "status": "success", "user": getUser });
        }
        else {
            res.status(403).send({ "status": "failure", "user": "user not found" });
        }
    };

    getAllDetails = async (req, res) => {
        const users = await this.userRepository.getAllUsers();
        res.status(200).send({ "status": "success", "user": users });
    };

    logout = async (req, res) => {
        return res
            .clearCookie('jwtToken')
            .status(200)
            .json({ message: "Successfully logged out" });
    };

    logoutAll = async (req, res) => {
        return res
            .clearCookie('jwtToken')
            .status(200)
            .json({ message: "Successfully logged out from All Devices" });
    };

    signup = async (req, res) => {
        const user = req.body;
        const result = await this.userRepository.signup(user);
        res.status(201).send({ "status": "success", "user": result });
    }

    signin = async (req, res) => {
        const { email, password } = req.body;
        const result = await this.userRepository.signin(email, password);
        if (result && result.status === "success") {
            // create token 
            console.log(result);
            const token = jwt.sign({ UserId: result.id, email: email }, '8WV68Swo691F3T0qoBSagfmZXf9DsRb6J', {
                expiresIn: '1h',
            })
            // send token
            res.status(201).cookie('jwtToken', token, { maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
                status: "success",
                msg: "login successful",
                token
            })
        } else {
            res.status(400).json({ status: "failure", msg: "invalid user details" });
        }
    }

    allUsers = async (req, res) => {
        const result = await this.userRepository.allUsers();
        res.status(200).send({ "status": "success", "user": result })
    };

}
