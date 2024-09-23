import express from "express";
import LikeController from "./like.controller.js";
// import { allLikes, likeToggle } from "./like.controller.js";

const router = express.Router();

const likeController = new LikeController();

router.route('/:id').get(likeController.allLikes);
router.route('/toggle/:id').get(likeController.toggleLike);

export default router;

