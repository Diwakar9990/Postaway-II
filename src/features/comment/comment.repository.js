import mongoose from "mongoose";
import { commentSchema } from "./comment.schema.js";

const CommentModel = mongoose.model('Comment', commentSchema);

export default class CommentRepository {

    async createComment(commentData) {
        try {
            const newComment = new CommentModel(commentData);
            const savedComment = newComment.save();
            return savedComment;
        } catch (e) { console.log(e); }
    }

    async allComments(postId) {
        try {
            const allComments = await CommentModel.find({ postId: postId });
            return allComments;
        } catch (e) { console.log(e); }
    }
    async updateComment(commentId, userId, content) {
        try {
            const editComment = await CommentModel.findOneAndUpdate(
                { _id: commentId, userId: userId },
                { content: content },
                { new: true },
            );
            await editComment.save();
            return editComment;
        } catch (e) { console.log(e); }
    }
    async deleteComment(commentId, userId) {
        try {
            const removeComment = await CommentModel.findOneAndDelete(
                { _id: commentId, userId: userId },
            );
            return removeComment;
        } catch (e) { console.log(e); }
    };
}