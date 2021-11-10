//Imports
const models = require('../models');
const asyncLibe = require('async');
const jwtUtils = require('../middleware/jwt.utils')
// Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
//Routes
module.exports = {
    createPost: function(req, res) {
         // Getting auth header
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        // Params
        const title = req.body.title;
        const content = req.body.content;

        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
            return res.status(400).json({ 'error': 'invalid parameters' });
            
        }
        asyncLibe.waterfall([
            function(done) {
                models.User.findOne({ id: userId })
                .then(function(userFound) {
                    console.log("---->",userFound);
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
            },
            function(userFound, done) {
                if(userFound) {
                    models.Post.create({
                        title   : title,
                        content : content,
                        likes   : 0,
                        UserId  : userFound.id
                    })
                    .then(function(newPost) {
                        done(newPost);
                    });
                } else {
                    console.log("/*/*/*/",userFound);
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], 
        function(newPost) {
            if (newPost) {
                return res.status(201).json({ newPost});
            } else {
                return res.status(500).json({ 'error': 'cannot send posts'});
            }
        });
    },
    listPosts: function(req, res, next) {
        const fields = req.query.fields; // column when we need to display
        const limit = parseInt(req.query.limit);  //|get posts by segmentation ( 20 posts per leaf)
        const offset = parseInt(req.query.offset); //|
        const order = req.query.order; // get posts by particular order

        models.Post.findAll({
            order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: [ 'lastName', 'firstName']
            }]
        }).then(function(posts) {
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({ 'error': 'no posts found'});
            }
        }).catch(function(err) {
            console.log(err);
            res.status(500).json({ 'error': 'invalid fields' });
        })

    },
    deleteOnePost: (req, res) => {
        console.log('//////////////////',req.params.id);
        models.Post.findOne({ where: { id: req.params.id} })
        .then(post=> {
            const filename = post.attachment.split('/images/')[1];//extract name to delete
            fs.unlink(`images/${filename}`, () => { // delete with fs.unlink
                models.Post.deleteOne({
                    where: {id : req.params.id} })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(404).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ message: 'Erreur serveur' }))
        
    },

    updatePost: (req, res) => {
        const title = req.body.title;
        const content = req.body.content;
        const attachment = req.body.attachment;
         console.log('//////////////////',req.params.id);
         asyncLib.waterfall([
            function(done) {
              models.User.findOne({
                attributes: [ 'id', 'birthday', 'profilePictures' ],
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
    }
}