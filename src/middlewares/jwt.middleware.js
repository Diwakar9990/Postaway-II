import jwt from 'jsonwebtoken';
const jwtAuth = (req, res, next) => {
    // read the token
    const { jwtToken } = req.cookies;
    try {
        const payload = jwt.verify(
            jwtToken,
            '8WV68Swo691F3T0qoBSagfmZXf9DsRb6J'
        );
        req.userId = payload.UserId;
        console.log(payload);
        next();
    } catch (e) {
        // return error
        console.log(e.message);
        return res.status(401).send('Unauthorized');
    }
}
export default jwtAuth;