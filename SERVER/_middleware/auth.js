const jwt = require('../_service/jwt');

const isWebValid = (req, res, next) => {
    console.log(req.body)
    let token = req.headers['authorization'] || req.params.token || req.query.token;
    if (token) {
        let decoded = jwt.verifyWebToken(token);
        if (decoded) {
            if (req.method === 'POST') {
                req.body.created_by = decoded._id
            } else if (req.method === 'PUT') {
                req.body.updated_by = decoded._id
            }
            console.log(req.body)
            req.session = decoded;
            next();
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid Token'
            })
        }
    } else {
        res.status(401).json({
            success: false,
            message: 'Token not found'
        });
    }
}

module.exports = {
    isWebValid
}