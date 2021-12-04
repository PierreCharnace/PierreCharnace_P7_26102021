//imports
const jwt = require('jsonwebtoken');
require('dotenv').config({path: './config/.env'});


//exported functions
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },process.env.JWTSIGNSECRET,{expiresIn: '24h'})
    },
    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function(authorization) {
        let userId = -1;
        const token = module.exports.parseAuthorization(authorization);
        if(token != null) {
            try {
                const jwtToken = jwt.verify(token, process.env.JWTSIGNSECRET);
                if(jwtToken != null)
                userId = jwtToken.userId;
            } catch(err) { }
        }
        return userId;
    }   
}