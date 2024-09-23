import OTPRepository from "./otp.repository.js";

export default class OTPController {
    constructor() {
        this.otpRepository = new OTPRepository();
    }

    sendOtp = async (req, res) => {
        const userId = req.userId;
        const email = req.body.email;
        const result = await this.otpRepository.sendOTP(userId, email);
        res.status(200).send(result);
    }

    verifyOtp = async (req, res) => {
        const userId = req.userId;
        const otp = req.body.otp;
        const result = await this.otpRepository.verifyOTP(userId, otp);
        res.status(200).send(result);
    };

    resetPass = async (req, res) => {
        const userId = req.userId;
        const otp = req.body.otp;
        const newPassword = req.body.password;
        const result = await this.otpRepository.resetPassword(userId, otp, newPassword);
        res.status(200).send(result);
    }
}