import jwt from 'jsonwebtoken';

function authenticateToken(req, resp, next) {
    const token = req.body.token;
    if (token == null) {
        return resp.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            return resp.sendStatus(403);
        }
        req.user = user
        next();
    });
}

export default authenticateToken;
