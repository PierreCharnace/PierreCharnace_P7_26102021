//Imports
const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../middleware/jwt.utils')


module.exports = {
    createComment: function(req, res) {
         // Getting auth header
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const postId = req.params.id 

        // Params
        const content = req.body.content;

        if (content == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
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
                    models.Comment.create({
                        content : content,
                    })
                    .then(function(newComment) {
                        done(newComment);
                    });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], 
        function(newComment) {
            if (newComment) {
                return res.status(201).json({ newPost});
            } else {
                return res.status(500).json({ 'error': 'cannot send posts'});
            }
        });
    },

    listComments: function(req, res, next) {
     //   const fields = req.query.fields; // column when we need to display
     //   const limit = parseInt(req.query.limit);  //|get posts by segmentation ( 20 posts per leaf)
      //  const offset = parseInt(req.query.offset); //|
       // const order = req.query.order; // get posts by particular order

        models.Comment.findAll({
     //       order: [(order != null) ? order.split(':') : ['title', 'ASC']],
     //       attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
     //       limit: (!isNaN(limit)) ? limit : null,
       //     offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: [ 'lastName', 'firstName', 'profilePictures', 'isAdmin']
            }]
        }).then(function(comments) {
            if (comments) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({ 'error': 'no posts found'});
            }
        }).catch(function(err) {
            res.status(500).json({ 'error': 'invalid fields' });
        })

    },
   
    deleteComment: (req, res) => {
        
        const headerAuth  = req.headers['authorization'];
        const userId      = jwtUtils.getUserId(headerAuth);
        const postId = req.params.id;

        asyncLib.waterfall([

            // Checks if the request is sent from an registered user
            function(done) {
                models.User.findOne({
                        where: { id: userId }
                    }).then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },

            // Get the targeted comment infos
            function(userFound, done) {
                models.Post.findOne({
                        where: { id: postId}
                    })
                    .then(function(commentFound) {
                        done(null, userFound, commentFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'Comment not found' });
                    });
            },

            function(userFound, commentFound, done) {

                // Checks if the user is the owner of the targeted one
                if (userFound.id == commentFound.UserId || userFound.isAdmin == true) { // or if he's admin

                    // Soft-deletion modifying the post the ad a timestamp to deletedAt
                    models.Comment.destroy({
                            where: { id: req.params.id }
                        })
                        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                        .catch(error => res.status(400).json({ error }));

                } else {
                    res.status(401).json({ 'error': 'user not allowed' });
                }
            },
        ],

        function(userFound) {
            if (userFound) {
                return res.status(201).json({ 'message': 'comment deleted' });
            } else {
                return res.status(500).json({ 'error': 'cannot delete comment' });
            }
        });
    },

}