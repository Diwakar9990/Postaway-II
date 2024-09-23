import mongoose from 'mongoose';
import { friendSchema } from './friend.schema.js';
const FriendModel = mongoose.model('Friend', friendSchema);

export default class FriendRepository {
    async getFriends(userId) {
        try {
            const friends = await FriendModel.find({ userId, status: 'accepted' })
                .populate('friendId', 'name email');
            return friends.map(friend => friend.friendId);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async getPendingRequests(userId) {
        try {
            const pendingRequests = await FriendModel.find(
                { friendId: userId, status: 'pending' }
            ).populate('userId', 'name email');
            return pendingRequests.map(request => request.userId);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async toggleFriendship(userId, friendId) {
        try {
            const existingFriendship = await FriendModel.findOne({ userId, friendId });

            if (existingFriendship) {
                await FriendModel.deleteOne({ _id: existingFriendship._id });
                return { status: 'friendship removed' };
            } else {
                const newFriendRequest = new FriendModel({ userId, friendId });
                await newFriendRequest.save();
                return { status: 'friendship requested' };
            }
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async respondToRequest(userId, friendId, response) {
        try {
            const friendRequest = await FriendModel.findOne({
                userId: friendId,
                friendId: userId,
                status: 'pending'
            });

            if (!friendRequest) {
                throw new Error('Friend request not found.');
            }
            if (response === 'accept') {
                friendRequest.status = 'accepted';
            } else if (response === 'reject') {
                friendRequest.status = 'rejected';
            } else {
                throw new Error('Invalid response.');
            }

            await friendRequest.save();
            return { status: friendRequest.status };
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}