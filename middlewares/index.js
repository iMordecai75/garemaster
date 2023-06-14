const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        token = bearerToken;

        jwt.verify(token, 'secretkey', async (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {                
                next();
            }
        });        
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    verifyToken
}