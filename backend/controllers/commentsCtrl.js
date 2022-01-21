//Imports
const models = require('../models');
const db = require("../models/index");
const Comment = db.comment;
const User = db.user;

const jwtUtils = require('../utils/jwt.utils')
const asyncLib = require('async');


module.exports = {
    createComment: function(req, res) {
         // Getting auth header
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const postId = req.params.id;
        // Params
        const content = req.body;
        console.log(req.body.content);
        if (content == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        asyncLib.waterfall([
            
            function(done) {//1///////////////////
                User.findOne({ 
                    where: { id: userId } })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
            },
            function(userFound, done) {//2////////////////////
                if(userFound) {
                    Comment.create({
                        content : content,
                        UserId: userFound.id,
                        postId: postId,
                    })
                    .then(function(newComment) {
                        done(newComment);    
                    })
                    .catch(function(err) {
                        return res.status(400).json({ 'error': 'user not found' });
                    });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], 
        function(newComment) {///////////////////3
            if (newComment) {
                return res.status(201).json({ newComment });
            } else {
                return res.status(505).json({ 'error': 'cannot send comments'});
            }
        });
    },

    listComments: function(req, res, next) {
        const fields = req.query.fields; // column when we need to display
        const order = req.query.order; // get posts by particular order
        Comment.findAll({
            order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            include: [{
                model: User,
                attributes: [ 'lastName', 'firstName', 'profilePictures', 'isAdmin', 'isModo']
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
   
    deleteComment: (req, res, next) => {
        
        const headerAuth  = req.headers['authorization'];
        const userId      = jwtUtils.getUserId(headerAuth);
        const commentsId = req.params.id;
        //console.log(userId);
   
        asyncLib.waterfall([

            function(done) {
                User.findOne({ 
                    where: { id: userId } })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': commentsId });
                });
            },

            // Get the targeted comment infos
            function(userFound, done) {
                Comment.findOne({
                        where: { id: commentsId}
                    })
                    .then(function(commentFound) {
                        done(null, userFound, commentFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'Comment not found' });
                    });
            },

            function(userFound, commentFound) {

                // Checks if the user is the owner of the targeted one
                if (userFound.id == commentFound.UserId || userFound.isAdmin == true || userFound.isModo == true) { // or if he's admin

                    // Soft-deletion modifying the post the ad a timestamp to deletedAt
                    Comment.destroy({
                            where: { id: commentsId }
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