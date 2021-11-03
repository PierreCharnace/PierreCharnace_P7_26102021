//Imports
const models = require('../models');
const asyncLibe = require('async');
const jwtUtils = require('../utils/jwt.utils')
// Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
//Routes
module.exports = {
    CreatePost: function(req, res) {
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
                models.User.findOne({
                    where: { id: userId }
                })
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
                        likes   : 0,
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
                return res.status(201).json({ 'error': 'cannot post message' });
            }
        });
    },
    listPosts: function(req, res) {
        const fields = req.query.fields;
        const limit = parseInt(req.query.limit);
        const offset = parseInt(rq.query.offset);
        const order = req.query.order;
    }
}