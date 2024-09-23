import express from "express";
import FriendController from "./friend.controller.js";
const router = express.Router();
const friendController = new FriendController();
router.route('/get-friends/:id').get(friendController.getUserFriends);
router.route('/get-pending-requests').get(friendController.pendingRequest);
router.route('/toggle-friendship/:id').get(friendController.toggleFriend);
router.route('/response-to-request/:id').get(friendController.respondToFriendRequst);
export default router;