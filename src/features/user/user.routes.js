import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from '../../middlewares/jwt.middleware.js';
const router = express.Router();

const userController = new UserController();

router.route("/signup").post(userController.signup);
router.route("/signin").post(userController.signin);
router.route('/').get(userController.allUsers);
router.route('/logout').get(jwtAuth, userController.logout);
router.route('/logout-all-devices').get(jwtAuth, userController.logoutAll);
router.route('/get-all-details').get(jwtAuth, userController.getAllDetails);
router.route('/get-details/:id').get(jwtAuth, userController.getDetails);
router.route('/update-details/:id').put(jwtAuth, userController.updateUser);

export default router;
