import FriendRepository from "./friend.repository.js";

export default class FriendController {
    constructor() {
        this.friendRepository = new FriendRepository();
    }

    getUserFriends = async (req, res) => {
        const userId = req.params.id;
        const userFreinds = await this.friendRepository.getFriends(userId);
        res.status(200).json(userFreinds);
    };

    pendingRequest = async (req, res) => {
        const userId = req.userId;
        const requests = await this.friendRepository.getPendingRequests(userId);
        res.status(200).json(requests);
    };

    toggleFriend = async (req, res) => {
        const userId = req.userId;
        const friendId = req.params.id;
        const status = await this.friendRepository.toggleFriendship(userId, friendId);
        res.status(200).json({
            'status': status.status,
        });
    }

    respondToFriendRequst = async (req, res) => {
        const userId = req.userId;
        const friendId = req.params.id;
        const response = req.query.response;
        const result = await this.friendRepository.respondToRequest(userId, friendId, response);
        res.status(200).json({ 'response': result.status });
    }
}