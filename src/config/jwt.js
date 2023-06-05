const jwt = require('jsonwebtoken');

const secretKey = 'mysecretkey';

function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
    return jwt.verify(token, secretKey);
}

module.exports = { generateToken, verifyToken };