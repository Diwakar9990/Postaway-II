// otpRepo.js
import { OTPModel } from './otp.schema.js';
import { sendEmail } from './otp.nodemailer.js';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../user/user.repository.js';



export default class OTPRepository {

    async sendOTP(userId, email) {
        try {
            const otp = uuidv4().slice(0, 6); // Generate a 6-character OTP
            await OTPModel.create({ userId, otp });
            await sendEmail(email, 'Your OTP Code',
                `Your OTP to reset your password is ${otp}`);
            return { status: 'OTP sent' };
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async verifyOTP(userId, otp) {
        try {
            const existingOTP = await OTPModel.findOne({ userId, otp });
            if (!existingOTP) {
                throw new Error('Invalid OTP');
            }
            await OTPModel.deleteOne({ _id: existingOTP._id }); // Delete OTP after successful verification
            return { status: 'verified' };
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async resetPassword(userId, otp, newPassword) {
        try {
            const verified = await this.verifyOTP(userId, otp);
            if (verified.status === 'verified') {
                // Assuming you have a User model and a method to update the password
                const user = await UserModel.findById(userId);
                user.password = newPassword; // Hash the password before saving in production
                await user.save();
                return { status: 'password_reseted_successfully' };
            }
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
