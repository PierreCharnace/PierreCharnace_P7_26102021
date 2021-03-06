//Imports
const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils')
const db = require("../models/index");
const Post = db.post;
const User = db.user;
const Comment = db.comment;
// Constants

const CONTENT_LIMIT = 4;
//Routes
module.exports = {
    createPost: function(req, res) {
         // Getting auth header
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        // Params
        const content = req.body.content;
        const attachment = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

        if ( content == null && attachment == null) {
            return res.status(401).json({ 'error': 'missing parameters' });
        }

        if (content.length <= CONTENT_LIMIT) {
            return res.status(401).json({ 'error': 'invalid parameters' });
        }

        asyncLib.waterfall([
             // 1. Get the user
            function(done) {
                User.findOne({ 
                    where: { id: userId } })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
            }, // 2. If found, create the post with inputs
            function(userFound, done) {
                if(userFound) {
                    Post.create({
                        content : content,
                        attachment: attachment,
                        UserId  : userFound.id
                    })
                    .then(function(newPost) {
                        done(newPost);
                    })
                    .catch(function(err) {
                        return res.status(400).json({ 'error': 'user not found' });
                    });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], 
        // 3. if done, confirm it
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
        asyncLib.waterfall([
        Post.findAll({
            order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{ // Links the post with User and Comments tables
                model: User,
                Comment,
                attributes: ['lastName', 'firstName', 'profilePictures','isAdmin','isModo'],
                
            }]
        }).then(function(posts) {// confirm or not
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({ 'error': 'no posts found'});
            }
        }).catch(function(err) {
            console.log(err);
            res.status(500).json({ 'error': 'invalid fields' });
        })

        ])},
    deleteOnePost: (req, res, next) => {
        
        const headerAuth  = req.headers['authorization'];
        const userId      = jwtUtils.getUserId(headerAuth);
        postId = req.params.id
        
        asyncLib.waterfall([
            // Checks if the request is sent from an registered user
            function(done) {
                User.findOne({
                        where: { id: userId }
                    }).then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(502).json({ 'error': 'unable to verify user' });
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
                        .then(() => res.status(200).json({ message: 'Post supprim?? !' }))
                        .catch(error => res.status(400).json({ message: "Post introuvable", error: error }))

                } else {
                    res.status(401).json({ 'error': "user not allowed" });
                }
            },
        ],
        
        function(userFound) {
            if (userFound) {
                return res.status(201).json({ 'message': 'post deleted' });
            } else {
                return res.status(500).json({ 'error': 'cannot delete post' });
            }
        });
    },

        updatePost: (req, res) => {
            //params
            const postId = req.params.id;
            const title = req.body.title;
            const content = req.body.content;
            const attachment = req.body.attachment;
            const headerAuth  = req.headers['authorization'];
            const userId      = jwtUtils.getUserId(headerAuth);
            
            asyncLib.waterfall([
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
                models.Post.findOne({
                        where: { id: postId }
                    })
                    .then(function(postFound) {
                        done(null, userFound, postFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'Post not found' });
                    });
            },/////////////////////////////////////////
            function(userFound, postToUpdate, done) {
              if(postToUpdate) {
                postToUpdate.update({
                  title: (title ? title : postToUpdate.title),
                  content: (content ? content : postToUpdate.content),  
                  birthday: (attachment ? attachment : postToUpdate.attachment),// verify if title, content, attachment is valid in req, if ok, 
                 
                }).then(function() {
                  done(postToUpdate); // when is update, return userFound, the waterfall is done
                }).catch(function(err) {console.log(postToUpdate);
                  res.status(500).json({ 'error': `cannot update post` });

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