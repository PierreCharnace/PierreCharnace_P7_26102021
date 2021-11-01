//imports
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');

//Routes

module.exports = {
    register: function(req, res) {
        //params
        const lastName = req.body.lastName;
        const firstName = req.body.firstName;
        const email = req.body.email;
        const birthday = req.body.birthday;
        const password = req.body.password;
        const ProfilePictures = req.body.ProfilePictures;

        if (email == null || lastName == null || firstName == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        //verify pseudo length, email regex, password

        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(userFound) {
            if (!userFound) {

                bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                    const newUser = models.User.create({
                        lastName : lastName,
                        firstName : firstName,
                        email : email,
                        birthday : birthday,
                        password : bcryptedPassword,
                        ProfilePictures : ProfilePictures,
                        isEnable : 0,
                        isAdmin : 0
                    })
                })
                .then(function(newUser) {
                    return res.status(201).json({
                        'userId': newUser.id
                    })
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'cannot add user'});
                })

            } else {
                return res.status(409).json({ 'error': 'user already exist' });
            }

        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user'})
        });

    },
    login: function(req, res) {

    }
}