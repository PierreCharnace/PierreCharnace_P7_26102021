//Imports
const models   = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');

//Constants

//Routes
module.exports = {
  likePost: function(req, res) {
      //Getting auth header
      const headerAuth = req.headers['authorization'];
      const userId     = jwtUtils.getUserId(headerAuth);//params take headerAuth

      //Params
      const postId = parseInt(req.params.postId);

      if (postId <= 0) {
          return res.status(400).json({ 'error': 'invalid parameters' });
      }

      asyncLib.waterfall([
          function(done) { // verfify user post
              models.Post.findOne({
                  where: { id: postId }
              })
              .then(function(postFound) {
                  done(null, postFound);
              })
              .catch(function(err) {
                  return res.status(500).json({ 'error': 'unable to verify post for like' });
              });
          },
          function(postFound, done) {// verify user
              if(postFound) {
                  models.User.findOne({
                      where:  { id: userId }
                  })
                  .then(function(userFound) {
                      done(null, postFound, userFound);
                  })
                  .catch(function(err) {
                      return res.status(500).json({ 'error': 'unable to verify user' });
                  });
              }   else {
                  res.status(404).json({ 'error': 'post already liked'});
              }
          },
          function(postFound, userFound, done) { // verfiy if post is liked by user
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
                      return res.status(500).json({ 'error': 'unable to verify is user already liked'});
                  });
              } else {
                  res.status(404).json({ 'error': 'user not exist' });
              }
          },
          function(postFound, userFound, isUserAlreadyLikedFound, done) { // check if the post is liked
              console.log('---->',);  
            if(!isUserAlreadyLikedFound) {
                postFound.addUser(userFound)
                  .then(function(alreadyLikeFound) {
                      //done(null, postFound, userFound);
                  })
                  .catch(function(err) {
                    console.log('userFound',postFound);
                      return res.status(500).json({ 'error': 'unable to set user reaction' });
                  });
              }   else {
                done(null, postFound, userFound);
                  res.status(409).json({ 'error': 'message already liked'});
              }
          },
          function(postFound, userFound, done) { // update the like counter
              postFound.update({
                  likes: postFound.likes + 1,
              }).then(function() {
                  done(postFound);
              }).catch(function(err) {
                  res.status(500).json({ 'error': 'cannot update post like counter' });
              });
          }
      ], function(postFound) { // send response
          if (postFound) {
              return res.status(201).json(postFound);
          }   else {
              return res.status(500).json({ 'error': 'cannot update message' })
          }
      })

  },
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
         console.log('<***>',isUserAlreadyLiked );
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