// id, userId, caption, imageUrl
import PostRepository from "./post.repository.js";

export default class PostController {
    constructor() {
        this.postRepository = new PostRepository();
    }

    getAll = async (req, res) => {
        const posts = await this.postRepository.getAllPosts();
        res.status(200).send({ "status": "success", "post": posts });
    };

    getAllPostOfUser = async (req, res) => {
        const userId = req.userId;
        const posts = await this.postRepository.getUserPosts(userId);
        res.status(200).send({ "status": "success", "post": posts });
    };

    getOnePost = async (req, res) => {
        const postId = req.params.id;
        const post = await this.postRepository.getPostById(postId);
        res.status(200).send({ "status": "success", "post": post });
    };

    addPost = async (req, res) => {
        const { caption } = req.body;
        const userId = req.userId;
        const imageUrl = req.file.filename;
        const newpost = await this.postRepository.addPost(userId, caption, imageUrl);
        res.status(201).send({ "status": "success", "post": newpost });
    };

    updatePost = async (req, res) => {
        const { caption } = req.body;
        const userId = req.userId;
        const imageUrl = req.file.filename;
        const id = req.params.id;
        const editedPost = await this.postRepository.updatePost(id, userId, caption, imageUrl);
        if (editedPost) {
            res.status(201).send({ "status": "success", "updated-post": editedPost });
        } else {
            res.status(403).send({ "status": "failed", "msg": "You cannot update others post" });
        }
    };

    deletePost = async (req, res) => {
        const id = req.params.id;
        const userId = req.userId;
        const removedPost = await this.postRepository.deletePost(id, userId);
        if (removedPost) {
            res.status(200).json({ "status": "success", "msg": "post deleted sucessfully", "res": removedPost });
        } else {
            res.status(403).send({ "status": "failed", "msg": "You cannot delete others post" });
        }
    }
}

export const createPost = (req, res, next) => {
    const { caption } = req.body;
    const userId = req.userId;
    const imageUrl = req.file.filename;
    const newpost = addPost(userId, caption, imageUrl);
    res.status(201).send(newpost);
}

export const getAll = (req, res) => {
    const posts = getAllPosts();
    res.status(200).send(posts);
}

export const update = (req, res) => {
    const id = req.params.id;
    const { caption } = req.body;
    const userId = req.userId;
    const imageUrl = req.file.filename;
    const updatedPost = updatePost(id, userId, caption, imageUrl);
    res.status(200).send(updatedPost);
}

export const delPost = (req, res) => {
    const id = req.params.id;
    deletePost(id);
    res.status(200).send("Post deleted successfully");
}

export const getOne = (req, res) => {
    const id = req.params.id;
    const post = getOnePost(id);
    res.status(200).send(post);
}

export const getByUserId = (req, res) => {
    const userId = req.userId;
    console.log(req.userId);
    const userPost = getAllPostbyUserId(userId);
    res.status(200).send(userPost);
}