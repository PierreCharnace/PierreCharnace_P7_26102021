//imports
const bcrypt = require('bcryptjs');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const cryptojs = require('crypto-js');
const asyncLib = require('async');
const { rmSync } = require('fs');

//Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

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
            return res.status(400).json({ 'error': 'paramètres manquants' });
        }
        if (lastName.length >= 30 || lastName.length <= 1) {
            return res.status(400).json({ 'error': 'Nom non comformes ildoit être compris entre 2 et 30 caractères'});
        }
        if (firstName.length >= 20 || firstName.length <= 1) {
            return res.status(400).json({ 'error': 'Prénom non comformes il doit être compris entre 2 et 20 caractères'});
        }
        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': 'email non valide' })
        }
        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'error': 'mot de passe non valide il doit être compris entre 4 et 8 caractères et contenir au moins 1 nombre'})
        }

        asyncLib.waterfall([
            function (done) {
                done(null);
            }
        ], function(err) {
            if(!err) {
                return res.status(200).json({ 'msg': 'ok'});
            }   else {
                return rmSync.status(404).json({ 'error': 'erreur'});
            }
        })

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