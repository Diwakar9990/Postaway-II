// import { getAllLikes, toggle } from "./like.model.js";

import LikeRepository from "./like.repository.js";

export default class LikeController {
    constructor() {
        this.likeRepository = new LikeRepository();
    }
    allLikes = async (req, res) => {
        const postId = req.params.id;
        const likesOnPost = await this.likeRepository.getAllLikes(postId);
        res.status(200).send(likesOnPost);
    };
    toggleLike = async (req, res) => {
        const postId = req.params.id;
        const userId = req.userId;
        const liked = await this.likeRepository.toggle(postId, userId);
        res.status(200).send({ 'liked': liked.liked });
    }
}

export const allLikes = (req, res, next) => {
    const postId = req.params.id;
    const allLikesOnPost = getAllLikes(postId);
    res.status(200).send(allLikesOnPost);
};

export const likeToggle = (req, res, next) => {
    const postId = req.params.id;
    const userId = req.userId;
    const toggleLike = toggle(postId, userId);
    res.status(200).send(toggleLike);
}