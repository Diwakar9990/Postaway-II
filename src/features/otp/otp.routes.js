import express from "express";
import OTPController from "./otp.controller.js";

const router = express.Router();

const otpController = new OTPController();

router.route('/otp/send').post(otpController.sendOtp);
router.route('/otp/verify').post(otpController.verifyOtp);
router.route('/otp/reset-password').post(otpController.resetPass);

export default router;