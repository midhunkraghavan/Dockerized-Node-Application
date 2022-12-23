const messages = require('../configs/messages.json');
const jwt = require('jsonwebtoken');
const jwtCredentials = require('../configs/jwt.json')

module.exports = function (req, res, next) {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        let token = req.headers.authorization.split(" ").pop();
        jwt.verify(token, jwtCredentials.secretKey, (error, result) => {
            if (error) {
                return res.status(401).send({
                    "status": 401,
                    "message": messages.notAuthorized
                });
            } else {
                return next()
            }
        })
    } else {
        return res.status(401).send({
            "status": 401,
            "message": messages.notAuthorized
        });
    }
}