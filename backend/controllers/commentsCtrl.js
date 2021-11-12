//Imports
const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../middleware/jwt.utils')
// Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
//Routes
module.exports = {
    createComment: function(req, res) {
         // Getting auth header
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

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
   
    deleteComment: (req, res) => {
        
        const headerAuth  = req.headers['authorization'];
        const userId      = jwtUtils.getUserId(headerAuth);
        const commentId = req.params.id;
        console.log('--->',postId);
        models.Comment.findOne({ 
     
            where: { id: postId} })
        .then(comment=> {
                models.Comment.deleteOne({
                    where: {id : postId} })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(404).json({ error }));
           // })
        })
        .catch(error => res.status(500).json({ message: 'Erreur serveur' }))
        
    },
}