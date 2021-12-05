//Imports
const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../middleware/jwt.utils')
const db = require("../models/index");
const User = db.user;
const Post = db.post;
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
        const attachment = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
            return res.status(400).json({ 'error': 'invalid parameters' });
        }

        asyncLib.waterfall([
            
            function(done) {
                models.User.findOne({ 
                    where: { id: userId } })
                .then(function(userFound) {
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
                        attachment: attachment,
                        UserId  : userFound.id
                    })
                    .then(function(newPost) {
                        done(newPost);
                    });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], 
        function(newPost) {
            if (newPost) {
                return res.status(201).json({ newPost });
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
                attributes: [ 'lastName', 'firstName', 'profilePictures','isAdmin']
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
        
        const headerAuth  = req.headers['authorization'];
        const userId      = jwtUtils.getUserId(headerAuth);
        const postId      = req.params.id;

        asyncLib.waterfall([
            // Checks if the request is sent from an registered user
            function(done) {
                User.findOne({
                        where: { id: userId }
                    }).then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },

            // Get the targeted post infos
            function(userFound, done) {
                Post.findOne({
                        where: { id: postId }
                    })
                    .then(function(postFound) {
                        done(null, userFound, postFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'Post not found' });
                    });
            },

            function(userFound, postFound) {

                // Checks if the user is the owner of the targeted one
                if (userFound.id == postFound.UserId || userFound.isAdmin == true || userFound.isModo == true) { // or if he's admin

                    // Soft-deletion modifying the post the ad a timestamp to deletedAt
                    Post.destroy({
                            where: { id: postId }
                        })
                        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                        .catch(error => res.status(400).json({ message: "Post introuvable", error: error }))

                } else {
                    res.status(401).json({ 'error': "user not allowed" });
                }
            },
        ]);
    },

    updatePost: (req, res) => {
        //params
    const postId = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    const attachment = req.body.attachment;
    
    const userId      = jwtUtils.getUserId(headerAuth);

         asyncLib.waterfall([
            function(done) {              
                models.Post.findOne({
                    attributes: [ 'title', 'content', 'attachment' ],
                    where: {id: postId}
                    })
                    .then(function (postToUpdate) {
                        done(null, postToUpdate); 
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify post' });
                    });
            },/////////////////////////////////////////
            function(postToUpdate, done) {
              if(postToUpdate) {
                postoUpdate.update({
                  title: (title ? title : postToUpdate.title),
                  content: (content ? content : postToUpdate.content),  
                  birthday: (attachment ? attachment : postToUpdate.attachment),// verify if title, content, attachment is valid in req, if ok, 
                 
                }).then(function() {
                  done(postToUpdate); // when is update, return userFound, the waterfall is done
                }).catch(function(err) {
                  res.status(500).json({ 'error': 'cannot update post' });
              });
          } else {
            res.status(404).json({ 'error': 'post not found' });
          }
        },
      ], function(userFound) {// if userFound is valid I return status 200
        if (userFound) {
          return res.status(201).json(userFound);
        } else {
          return res.status(500).json({ 'error': 'cannot update posts' });
        }
      });
    }
}