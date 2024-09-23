const likes = [];
let id = 0;
class LikeSchema {
    constructor(postId, userId) {
        this.id = ++id;
        this.postId = postId;
        this.userId = userId;
    }
}

// get '/:postId' retrive all likes of a specific post
export const getAllLikes = (postId) => {
    const likesOnPost = likes.filter(like => like.postId === postId);
    return likesOnPost;
}

// get '/toggle/:postId' toggle like status of a specific post
export const toggle = (postId, userId) => {
    const likeIndex = likes.findIndex(like => like.postId === postId && like.userId === userId);

    if (likeIndex !== -1) {
        // If the like exists, remove it
        likes.splice(likeIndex, 1); 1
        return { status: 'unliked', postId, userId };
    } else {
        // If the like does not exist, add it
        const newLike = new LikeSchema(postId, userId);
        likes.push(newLike);
        return { status: 'liked', postId, userId };
    }
}