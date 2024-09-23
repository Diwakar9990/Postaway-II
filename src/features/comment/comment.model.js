// id, userID, postID, content
import { ApplicationError } from "../../error-handler/app-error.js";
const comments = [];

let id = 0;
class commentSchema {
    constructor(userID, postID, content) {
        this.id = ++id;
        this.userID = userID;
        this.postID = postID;
        this.content = content;
    }
}

export const createComment = (userID, postID, content) => {
    const newComment = new commentSchema(userID, postID, content);
    comments.push(newComment);
    return newComment;
}

export const getAllComments = (postID) => {
    const commentsOnPost = comments.filter(comment => comment.postID == postID);
    return commentsOnPost;
}

export const updateComment = (id, content) => {
    const index = comments.findIndex(comment => comment.id == id);
    if (index === -1) throw new ApplicationError("comment not found", 404);
    comments[index].content = content;
    return comments[index];
}

export const deleteComment = (id) => {
    const index = comments.findIndex(comment => comment.id == id);
    if (index === -1) throw new ApplicationError("comment not found", 404);
    comments.splice(index, 1);
}