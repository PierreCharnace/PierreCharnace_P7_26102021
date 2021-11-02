//imports
const bcrypt = require('bcryptjs');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const cryptojs = require('crypto-js');

//COnstants
const EMAIL_REGEX = /erzezrer/;
const PASSWORD_REGEX = /zer/;

//Routes

module.exports = {
    register: function(req, res) {
        //params
        const email = req.body.email;
        const lastName = req.body.lastName;
        const firstName = req.body.firstName;
        const birthday = req.body.birthday;
        const password = req.body.password;
        const profilePictures = req.body.profilePictures;

        if (email == null || lastName == null || firstName == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        if (lastName.length >= 20 || lastName.length <= 1) {
            return res.status(400).json({ 'error': 'wrong lastname (must be length 2 - 20'});
        }
        if (firstName.length >= 30 || firstName.length <= 1) {
            return res.status(400).json({ 'error': 'wrong lastname (must be length 2 - 20'});
        }
        if (!EMAIL_REGEX.test(email)) {

        }

        //todo verify pseudo length, email regex, password

        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(userFound) {
            if (!userFound) {

                bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                    const newUser = models.User.create({
                        email : email,
                        lastName : lastName,
                        firstName : firstName,                       
                        birthday : birthday,
                        password : bcryptedPassword,
                        profilePictures : profilePictures,
                        isEnable : 0,
                        isAdmin : 0
                    })
               
                .then(function(newUser) {
                    return res.status(201).json({
                        'userId': newUser.id,
                    })
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'cannot add user'});
                });
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
            //params   
        const email = req.body.email;
        const password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        //todo verify mail regex & password length

        models.User.findOne({
            where: { email }
        })
        .then(function(userFound) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    if(resBycrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else {
                        return res.status(403).json({ 'error': 'invalid password' });
                    }
                });

            } else {
                return res.status(404).json({ 'error': 'user not exist in DB'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
        });
    }
}