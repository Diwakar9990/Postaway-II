import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const url = process.env.DB_URL;
export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected using Mongoose');
    } catch (err) {
        console.log('error while connecting to db')
        console.log(err);
    }
};