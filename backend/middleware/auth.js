const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../config/.env'});

module.exports = (req, res, next) => {
    try {
        //catch second element
        const token = req.headers.authorization.split(' ')[1]; //return array with bearer for catch seconde element
        //verify if it's true
        const decodedToken = jwt.verify(token, process.env.JWTSIGNSECRET); // decode token for verify if it's true
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) { //  compare UserID  if it's ok
            throw 'user ID non valable ! ';
        } else {
            next ();
        }
    } catch (error){
        res.status(401).json({ error: error | 'requête non authentifiée !'});
    }
}
