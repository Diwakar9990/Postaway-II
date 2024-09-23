// import { getAllComments, createComment, updateComment, deleteComment } from "./comment.model.js";
import CommentRepository from "./comment.repository.js";


export default class CommentController {

    constructor() {
        this.commentRepository = new CommentRepository();
    }

    addComment = async (req, res) => {
        const postId = req.params.id;
        const userId = req.userId;
        const commentData = req.body.content;
        const obj = {
            postId,
            userId,
            content: commentData,
        }
        const comment = await this.commentRepository.createComment(obj);
        res.status(201).send(comment);
    };
    allPostComments = async (req, res) => {
        const postId = req.params.id;
        const comments = await this.commentRepository.allComments(postId);
        res.status(200).send(comments);
    };

    editComment = async (req, res) => {
        const commentId = req.params.id;
        const userId = req.userId;
        const content = req.body.content;
        const editedComment = await this.commentRepository.updateComment(commentId, userId, content);
        if (editedComment) {
            res.status(200).send({ "status": "success", "updated-comment": editedComment });
        } else {
            res.status(403).send({ "status": "failed", "msg": "You cannot update others comments" });
        }
    };
    removeComment = async (req, res) => {
        const commentId = req.params.id;
        const userId = req.userId;
        const deletedComment = await this.commentRepository.deleteComment(commentId, userId);
        if (deletedComment) {
            res.status(200).json({ "status": "success", "msg": "post deleted sucessfully", "res": deletedComment });
        } else {
            res.status(403).send({ "status": "failed", "msg": "You cannot delete others comment" });
        }
    };
}
