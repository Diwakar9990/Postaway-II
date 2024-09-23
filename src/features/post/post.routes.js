import express from 'express';
import { createPost, getAll, getOne, update, delPost, getByUserId } from './post.controller.js';
import PostController from './post.controller.js';
import { upload } from '../../middlewares/fileUpload.middleware.js';

const router = express.Router();
const postController = new PostController();
router.route('/').post(upload.single('imageUrl'), postController.addPost);
router.route('/all').get(postController.getAll);
router.route('/:id').put(upload.single('imageUrl'), postController.updatePost);
router.route('/:id').get(postController.getOnePost);
router.route('/:id').delete(postController.deletePost);
router.route('/').get(postController.getAllPostOfUser);

export default router;
