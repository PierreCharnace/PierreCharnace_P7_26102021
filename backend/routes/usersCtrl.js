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
                models.User.findOne({
                    attributes: ['email'],
                    where: { email: email }
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user'});
                });
            },
            function(userFound, done) {
                if (!userFound) {
                  bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                    done(null, userFound, bcryptedPassword);
                  });
                } else {
                  return res.status(409).json({ 'error': 'user already exist' });
                }
            },
        function(userFound, bcryptedPassword, done) {
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
                    done(newUser);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'cannot add user'});
                });
            }
        ], function (newUser) {
            if (newUser) {
                return res.status(201).json({
                    'userId': newUser.id
                });
            } else {
                return res.status(500).json({ 'error': 'cannot add user' })
            }
        });

    },
    login: function(req, res) {
            //params   
        const email = req.body.email;
        const password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'paramètres manquants' });
        }

        asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          where: { email: email }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if (userFound) {
          bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
            done(null, userFound, resBycrypt);
          });
        } else {
          return res.status(404).json({ 'error': 'user not exist in DB' });
        }
      },
      function(userFound, resBycrypt, done) {
        if(resBycrypt) {
          done(userFound);
        } else {
          return res.status(403).json({ 'error': 'invalid password' });
        }
      }
    ], function(userFound) {
      if (userFound) {
        return res.status(201).json({
          'userId': userFound.id,
          'token': jwtUtils.generateTokenForUser(userFound)
        });
      } else {
        return res.status(500).json({ 'error': 'cannot log on user' });
      }
    });
  },
  getUserProfile: function(req, res) {
    // Getting auth header
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0)
      return res.status(400).json({ 'error': 'wrong token' });

    models.User.findOne({
      attributes: [ 'id', 'lastName', 'firstName', 'email', 'birthday', 'profilePictures' ],
      where: { id: userId }
    }).then(function(user) {
      if (user) {
        res.status(201).json(user);
      } else {
        res.status(404).json({ 'error': 'user not found' });
      }
    }).catch(function(err) {
      res.status(500).json({ 'error': 'cannot fetch user' });
    });
  },
  updateUserProfile: function(req, res) {
    // Getting auth header
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    // Params
    const birthday = req.body.birthday;
    const profilePictures = req.body.profilePictures;

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          attributes: [ 'id', 'birthday', 'profilePictures' ],
          where: { id: userId }
        }).then(function (userFound) {//return user
          done(null, userFound); // next function with done
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if(userFound) {
          userFound.update({
            birthday: (birthday ? birthday : userFound.birthday),                           // verify if birthday and profilePictures is valid in req, if ok, 
            porfilePictures: (profilePictures ? profilePictures : userFound.profilePictures) // substitute or if same thing I let them
          }).then(function() {
            done(userFound); // when is update, return userFound, the waterfall is done
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update user' });
        });
    } else {
      res.status(404).json({ 'error': 'user not found' });
    }
  },
], function(userFound) {// if userFound is valid I return status 200
  if (userFound) {
    return res.status(201).json(userFound);
  } else {
    return res.status(500).json({ 'error': 'cannot update user profile' });
  }
});
}
}