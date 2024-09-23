// Import Express
import express from 'express';
import userRoutes from "./src/features/user/user.routes.js";
import postRoutes from "./src/features/post/post.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";
import likeRouter from "./src/features/like/like.routes.js";
import friendRouter from "./src/features/friend/friend.routes.js";
import otpRouter from "./src/features/otp/otp.routes.js";
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cookieParser from "cookie-parser";
import { ApplicationError } from './src/error-handler/app-error.js';

// create server
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use("/api/users", userRoutes);
app.use("/api/post", jwtAuth, postRoutes);
app.use("/api/comments", jwtAuth, commentRouter);
app.use("/api/likes", jwtAuth, likeRouter);
app.use('/api/friends', jwtAuth, friendRouter);
app.use('/api/otp', jwtAuth, otpRouter);

app.get('/', (req, res) => {
    res.send('Welcome to Instagram APIs');
});

app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof ApplicationError) {
        res.status(err.code).send(err.message);
    }
    // server errors.
    res
        .status(500)
        .send(
            'Something went wrong, please try later'
        );
});

// 4. Middleware to handle 404 requests.
app.use((req, res) => {
    res.status(404).send("API not found")
});

export default app;