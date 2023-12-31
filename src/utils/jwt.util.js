const jwt = require('jsonwebtoken');
const { jwtKey } = require('../configs/index');

const keyJwt = jwtKey;

const generateToken = (user) => {
    const token = jwt.sign({ user }, keyJwt, { expiresIn: '24h' });
    return token;
};

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ status: 'error', error: 'Unauthorized' });

    const token = authHeader.split(' ')[1];

    jwt.verify(token, keyJwt, (error, credentials) => {
        if (error) return res.status(403).json({ status: 'error', error: 'Forbidden' });

        req.user = credentials.user;
        next();
    });
};

module.exports = {
    generateToken,
    authToken,
};