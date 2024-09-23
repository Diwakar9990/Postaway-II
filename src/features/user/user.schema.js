import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: {
        type: String,
        select: false
    },
    gender: { type: String, enum: ['male', 'female'] },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});