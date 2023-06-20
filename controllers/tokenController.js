const jwt = require('jsonwebtoken');
const {
    getUserByApikey
} = require('./userController');

async function getToken(apikey) { 
    try {
        const { username, password} = await getUserByApikey(apikey);

        const user = {
            username: username,
            password: password
        }

        const token = jwt.sign({ user: user }, apikey, { expiresIn: '1h' });

        return token;        
    } catch (error) {
        
    }
}

module.exports = {
    getToken
}