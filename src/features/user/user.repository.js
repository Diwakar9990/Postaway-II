import mongoose from 'mongoose';
import { userSchema } from './user.schema.js';

export const UserModel = mongoose.model('User', userSchema);

export default class UserRepository {

    async updateOne(id, userData) {
        try {
            const user = await UserModel.findOneAndUpdate(
                { _id: id },
                {
                    name: userData.name,
                    email: userData.email,
                },
                { new: true }
            )
            const savedUser = user.save();
            return savedUser;
        } catch (e) { console.log(e); }
    }

    async getUser(id) {
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (e) { console.log(e); }
    }

    async getAllUsers() {
        try {
            const allUsers = await UserModel.find({});
            return allUsers;
        } catch (e) { console.log(e); }
    }

    async signup(user) {
        try {
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser
        } catch (e) { console.log(e); }
    }

    async signin(email, password) {
        try {
            const user = await UserModel.findOne({ email, password });
            if (user) {
                return { "status": "success", "msg": "login successful", "id": user._id };
            }
        } catch (e) { console.log(e); }
    }

    async allUsers() {
        try {
            const user = await UserModel.find({})
            return user
        } catch (e) { console.log(e); }
    }
}