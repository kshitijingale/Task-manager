const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1]
        // Check if token doesn't exist
        if (!token) {
            return res.status(401).send('Access Denied');
        }

        // Verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode;

    } catch (error) {
        console.error(`Auth middleware :: ${error}`);
        // Invalid token
        return res.status(401).send(error.message)
    }
    next();
}

module.exports = auth;