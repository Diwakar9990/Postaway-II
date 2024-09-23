import mongoose from 'mongoose';
import { likeSchema } from './like.schema.js';

const LikeModel = mongoose.model('Like', likeSchema);

export default class LikeRepository {

    async getAllLikes(postId) {
        try {
            const getLikes = await LikeModel.find({ postId: postId });
            return getLikes;
        } catch (e) { console.log(e); }
    }

    async toggle(postId, userId) {
        try {
            const existingLike = await LikeModel.findOne({ postId, userId });

            if (existingLike) {
                await LikeModel.deleteOne({ _id: existingLike._id });
                return { liked: false };
            } else {
                // If it doesn't exist, create it (like)
                const newLike = new LikeModel({ postId, userId });
                await newLike.save();
                return { liked: true };
            }
        } catch (e) { console.log(e); }
    }
}