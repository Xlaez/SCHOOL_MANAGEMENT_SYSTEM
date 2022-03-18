const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuth = (req, res, next) => {
        const error = 'Not authenticated';
    var auth = req.get("Authorization")
    if (!auth) {
        return res.status(403).json({ error: error });
    }
    if(auth === null){
        return res.status(403).json({ error: error });
    }

    var token = auth;
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (err) {
        return res.status(403).json(err);
    }

    if (!decodedToken) return res.status(403).json({ message: "You haven't been granted permission, try logging in again!" })
    req.userAccess = decodedToken.id;
    next();
}

module.exports = {
    isAuth
}