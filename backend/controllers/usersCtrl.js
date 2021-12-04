//imports
const bcrypt = require('bcryptjs');
const jwtUtils = require('../middleware/jwt.utils');

const db = require("../models/index");
const User = db.user;
const cryptojs = require('crypto-js');
const asyncLib = require('async');
require('dotenv').config({path: './config/.env'});
//Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

module.exports = {
    register: function(req, res) {
        //params
        const email = req.body.email;
        const encryptEmail = cryptojs.HmacSHA256(req.body.email, process.env.ENCRYPTEDKEYEMAIL).toString();
        const lastName = req.body.lastName;
        const firstName = req.body.firstName;
        const password = req.body.password;
        const profilePictures = "https://pic.onlinewebfonts.com/svg/img_24787.png";

        if (email == null || lastName == null || firstName == null || password == null) {
            return res.status(400).json({ 'error': 'paramètres manquants' });
        }
        if (lastName.length >= 30 || lastName.length <= 1) {
            return res.status(400).json({ 'error': 'Nom non comformes il doit être compris entre 2 et 30 caractères'});
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
          //check if user exist
            function (done) {
                User.findOne({
                    attributes: ['email'],
                    where: { email: encryptEmail }
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user'});
                });
            },// If not, Hash the password
            function(userFound, done) {
                if (!userFound) {
                  bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                    done(null, userFound, bcryptedPassword);
                  });
                } else {
                  return res.status(409).json({ 'error': 'user already exist' });
                }
            }, // Create User in DB
        function(userFound, bcryptedPassword, done) {
                let newUser = User.create({
                    email     : encryptEmail,
                    lastName  : lastName,
                    firstName : firstName,                       
                    password  : bcryptedPassword,
                    profilePictures : profilePictures,
                    isAdmin : 0,
                    isModo : 0
                })
                .then(function(newUser) {
                    done(newUser);
                })
                .catch(function(err) {console.log('-->',);
                    return res.status(500).json({ 'error': 'unable add user'});
                });
            }// after creat return new userId
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
        const encryptEmail = cryptojs.HmacSHA256(req.body.email, process.env.ENCRYPTEDKEYEMAIL).toString();

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'paramètres manquants' });
        }

        asyncLib.waterfall([
      function(done) {
        User.findOne({ 
          where: { email: encryptEmail }})
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

  getAllProfile: function(req, res) {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    
    asyncLib.waterfall([
      // verify if user exist
      function(done) {
        User.findOne({
                where: { id: userId }
            })
            .then(function(userFound) {
                done(null, userFound);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to verify user' });
            });
    },
    //If is found, get all user Profile
      function(userFound, done) {
        if (userFound && userFound.isAdmin == 1) {
            User.findAll({
                    attributes: ['id', 'lastName', 'firstname', 'email', 'profilePictures', 'isAdmin', 'createdAt']
                })
                .then(function(users) {
                    done(users)
                }).catch(function(err) {
                    console.log(err);
                    res.status(500).json({ "error": "invalid fields" });
                });
        } else {
            res.status(404).json({ 'error': 'user not allowed' });
        }
    },
    ],
    function(users) {
      if (users) {
          return res.status(201).json(users);
      } else {
          return res.status(500).json({ 'error': 'cannot send users' });
      }
  })
    
},

  getUserProfile: function(req, res) {
    const headerAuth  = req.headers['authorization'];
    const userId      = jwtUtils.getUserId(headerAuth);

    if (userId < 0)
      return res.status(400).json({ 'error': 'wrong token' });

    User.findOne({
      attributes: [ 'id', 'lastName', 'firstName', 'email', 'birthday', 'profilePictures' ],
      where: { id: userId}
    })
    .then(function(user) {
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
    // Params
    const headerAuth  = req.headers['authorization'];
    const userId      = jwtUtils.getUserId(headerAuth);
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const birthday = req.body.birthday;
    const profilePictures = req.body.profilePictures;

    asyncLib.waterfall([
      function(done) {
        User.findOne({
          attributes: [ 'id','lastName', 'firstName', 'birthday', 'profilePictures' ],
          where: { id: userId}
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
            lastName: (lastName ? lastName : userFound.lastName),
            firstName: (firstName ? firstName : userFound.firstName),
            birthday: (birthday ? birthday : userFound.birthday),                           // verify if birthday and profilePictures is valid in req, if ok, 
            profilePictures: (profilePictures ? profilePictures : userFound.profilePictures) // substitute or if same thing I let them
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
      },
      
  deleteProfile: function(req, res) {
    const headerAuth  = req.headers['authorization'];
    const userId      = jwtUtils.getUserId(headerAuth);

    asyncLib.waterfall([
      function(done) {
        User.findOne({ 
            where: { id: userId } })
        .then(function(userFound) {
            done(null, userFound);
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
        });
    },
    function(userFound, done) {

      // Checks if the user is the owner of the targeted one
      if (userFound.id == req.body.userId || userFound.isAdmin == true) { // or if he's admin

          // Soft-deletion modifying the post the ad a timestamp to deletedAt
          User.destroy({
                  where: { id: req.params.id }
              })
              .then(() => res.status(200).json({ message: 'Utilisateur supprimé' })) // send confirmation if done
              .catch(error => res.status(500).json({ 'error': 'cannot delete user' }))

      } else {
          res.status(401).json({ 'error': 'user not allowed' });
      }
      },
    ])
    },
}