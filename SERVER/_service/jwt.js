const jwt = require('jsonwebtoken');
const config = require('../_config');

const signWebToken = (user) => {
    return jwt.sign(user, config.secret.web);
}

const verifyWebToken = (token) => {
    return jwt.verify(token, config.secret.web)
}

module.exports = {
    signWebToken,
    verifyWebToken
}