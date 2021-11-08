//Imports
const models   = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');
const dbc = require("../config/db");
const db = dbc.getDB();

//Routes
module.exports = {
  likePost: function (req, res) {
    //Getting auth header
    const { userId, postId } = req.body;
    const sqlSelect = `SELECT * FROM likes WHERE likes.user_id = ${userId} AND likes.post_id = ${postId}`;
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err);
        res.status(404).json({ err });
        throw err;
      }
  
      if (result.length === 0) {
        const sqlInsert = `INSERT INTO likes (user_id, post_id) VALUES (${userId}, ${postId})`;
        db.query(sqlInsert, (err, result) => {
          if (err) {
            console.log(err);
            res.status(404).json({ err });
            throw err;
          }
          res.status(200).json(result);
        });
      } else {
        const sqlDelete = `DELETE FROM likes WHERE likes.user_id = ${userId} AND likes.post_id = ${postId}`;
        db.query(sqlDelete, (err, result) => {
          if (err) {
            console.log(err);
            res.status(404).json(err);
            throw err;
          }
          res.status(200).json(result);
        });
      }
    });

  },/*
  get likePost() {
    return this._likePost;
  },
  set likePost(value) {
    this._likePost = value;
  },*/
  dislikePost: function(req, res) {
      // Getting auth header
      const headerAuth  = req.headers['authorization'];
      const userId      = jwtUtils.getUserId(headerAuth);
   
      // Params
      const postId = parseInt(req.params.postId);
   
      if (postId <= 0) {
        return res.status(400).json({ 'error': 'invalid parameters' });
      }
   
      asyncLib.waterfall([
       function(done) {
          models.Post.findOne({
            where: { id: postId }
          })
          .then(function(postFound) {
            done(null, postFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify post for dislike' });
          });
        },
        function(postFound, done) {
          if(postFound) {
            models.User.findOne({
              where: { id: userId }
            })
            .then(function(userFound) {
              done(null, postFound, userFound);
            })
            .catch(function(err) {
              return res.status(500).json({ 'error': 'unable to verify user' });
            });
          } else {
            res.status(404).json({ 'error': 'post already liked' });
          }
        },
        function(postFound, userFound, done) {
          if(userFound) {
            models.Like.findOne({
              where: {
                userId: userId,
                postId: postId
              }
            })
            .then(function(isUserAlreadyLikedFound) {
               done(null, postFound, userFound, isUserAlreadyLikedFound);
            })
            .catch(function(err) {
              return res.status(500).json({ 'error': 'unable to verify is user already liked' });
            });
          } else {
            res.status(404).json({ 'error': 'user not exist' });
          }
        },
        function(postFound, userFound, isUserAlreadyLiked, done) {
         console.log('<***>DISLIKE',postFound,isUserAlreadyLiked );
          if(isUserAlreadyLiked) {
             isUserAlreadyLiked.destroy()
           .then(function (alreadyLikeFound) {
             done(null, postFound, userFound);
           })
           .catch(function(err) {
             return res.status(500).json({ 'error': 'unable to set user reaction' });
           });
         } else {
          done(null, postFound, userFound);
         }
        },
        function(postFound, userFound, done) {
          postFound.update({
            likes: postFound.likes - 1,
          }).then(function() {
            done(postFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update message like counter' });
          });
        },
      ], function(postFound) {
        if (postFound) {
          return res.status(201).json(postFound);
        } else {
          return res.status(500).json({ 'error': 'cannot update message' });
        }
      });
     }
     
  }