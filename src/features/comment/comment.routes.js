import express from 'express';
// import { allComments, addComment, removeComment, editComment } from "./comment.controller.js";
import CommentController from './comment.controller.js';



const router = express.Router();
const commentController = new CommentController();
router.route('/:id').get(commentController.allPostComments);
router.route('/:id').post(commentController.addComment);
router.route('/:id').put(commentController.editComment);
router.route('/:id').delete(commentController.removeComment);

export default router;

