import mongoose from 'mongoose';
import { postSchema } from './post.schema.js';
import { userSchema } from '../user/user.schema.js';

const PostModel = mongoose.model('Post', postSchema);
const UserModel = mongoose.model('User', userSchema);

export default class PostRepository {

    async getPostById(postId) {
        try {
            const post = await PostModel.findById(postId);
            return post;
        } catch (e) { console.log(e); }
    }


    async getAllPosts() {
        try {
            const posts = await PostModel.find({}).exec();
            return posts
        } catch (e) { console.log(e); }
    }

    async getUserPosts(userId) {
        try {
            const posts = await PostModel.find({ userId: userId });
            return posts
        } catch (e) { console.log(e); }
    }

    async addPost(userId, caption, imageUrl) {
        try {
            const obj = { userId, caption, imageUrl };
            const newPost = new PostModel(obj);
            const user = await UserModel.findById(userId);
            user.posts.push(newPost._id);
            await user.save();
            await newPost.save();
            return newPost;
        } catch (e) { console.log(e); }
    }

    async updatePost(id, userId, caption, imageUrl) {
        try {
            const updatePost = await PostModel.findOneAndUpdate(
                { _id: id, userId: userId },
                { caption: caption, imageUrl: imageUrl },
                { new: true }
            )
            const savedPost = await updatePost.save()
            return savedPost;
        } catch (e) {
            console.log(e)
        }
    }

    async deletePost(id, userId) {
        const deletePost = await PostModel.findOneAndDelete({
            _id: id,
            userId: userId
        })
        const user = await UserModel.findById(userId);
        // console.log(user);
        user.posts.pull(id);
        await user.save();
        return deletePost;
    }
}