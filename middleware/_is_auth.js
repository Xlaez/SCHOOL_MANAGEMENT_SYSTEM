const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuth = (req, res, next) => {
    var auth = req.get('x-access-token')
    if (!auth) {
        const error = 'Not authenticated';
        return res.status(403).json({ error: error });
    }

    var token = auth;
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (err) {
        return res.status(400).json(err);
    }

    if (!decodedToken) return res.status(403).json({ message: "You haven't been granted permission, try logging in again!" })
    req.userId = decodedToken.id;
    next();
}

module.exports = {
    isAuth
}