// id, userId, caption, imageUrl
import { ApplicationError } from "../../error-handler/app-error.js";
const posts = [
    {
        "id": 1,
        "userId": 1,
        "caption": "no caption",
        "imageUrl": "1716580155417Screenshot .jpg"
    },
    {
        "id": 2,
        "userId": 1,
        "caption": "caption",
        "imageUrl": "1716580176952Screenshot .jpg"
    },
    {
        "id": 3,
        "userId": 1,
        "caption": "caption needed",
        "imageUrl": "1716580205309Screenshot 2021-06-27 .jpg"
    },
    {
        "id": 4,
        "userId": 3,
        "caption": "caption needed",
        "imageUrl": "1716580328360Screenshot 2021-06-27 .jpg"
    },
    {
        "id": 5,
        "userId": 3,
        "caption": "caption needed",
        "imageUrl": "1716580346507Screenshot 2021-06-27 .jpg"
    },
    {
        "id": 6,
        "userId": 3,
        "caption": "caption needed about what",
        "imageUrl": "1716580356166Screenshot 2021-06-27 .jpg"
    }
];
let id = 0;
class PostSchema {
    constructor(userId, caption, imageUrl) {
        this.id = ++id;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
    }
}

export const addPost = (userId, caption, imageUrl) => {
    const post = new PostSchema(userId, caption, imageUrl);
    posts.push(post);
    return post;
}

export const getAllPosts = () => {
    return posts;
}

export const getOnePost = (id) => {
    const post = posts.find((p) => p.id == id);
    if (!post) throw new ApplicationError("Post not found", 404);
    return post;
}

export const updatePost = (id, userId, caption, imageUrl) => {
    const index = posts.findIndex((p) => p.id == id && p.userId == userId);
    if (index === -1) throw new ApplicationError("Post not found", 404);
    posts[index].caption = caption;
    posts[index].imageUrl = imageUrl;
    return posts[index];
}

export const deletePost = (id) => {
    const index = posts.findIndex((p) => p.id == id);
    if (index === -1) throw new ApplicationError("Post not found", 404);
    posts.splice(index, 1);
}

export const getAllPostbyUserId = (userId) => {
    console.log(userId);
    const userPosts = posts.filter((post) => post.userId == userId);
    console.log(userPosts);
    return userPosts;
}