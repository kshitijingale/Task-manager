const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const { token } = req.cookies
    // Check if token doesn't exist
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    // Verify token
    try {
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