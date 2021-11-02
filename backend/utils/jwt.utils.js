//imports
const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'THE SECRET KEY FOR GROUPOMANIA'

//exported functions
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '24h'
        })
    }
}