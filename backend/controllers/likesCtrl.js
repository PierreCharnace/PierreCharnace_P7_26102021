//Imports

const jwtUtils = require('../middleware/jwt.utils');
//const asyncLib = require('async');



//Routes
module.exports = {
  likeOrDislikePost: function (req, res, next) {
    //params
    const likeStatus = req.body.like;
    const headerAuth = req.headers['authorization'];
    const userId     = jwtUtils.getUserId(headerAuth);//params take headerAut
    const Post = require('../models/post');
    const postId = parseInt(req.params.id);
    console.log("*************>",postId);
    Post.findOne({ id: postId })
    .then(post => { //get back sauces ID
  
      if (likeStatus === 1) {   
        Post.updateOne({ id: postId },

          //{$push: { usersLiked: userId }, $inc: { likes: +1 },} // like this post
        )
        .then(() => res.status(200).json({ message: 'Vous aimez ce post. (^-^) ' }))
        .catch((error) => res.status(400).json({ error: "youhou" }))
      }
  
      if (likeStatus === -1) {
        Sauce.updateOne(
          { _id: thisPostId },
          {$push: { usersDisliked: userId }, $inc: { dislikes: +1 },}
        )
        .then(() => res.status(200).json({ message: 'Vous n\'aimez pas cette sauce. :-( ' }))
        .catch((error) => res.status(400).json({ error }))
      }
  
      /*if (likeStatus === 0) {
        const ind = sauce.usersLiked.indexOf(userId);
        if (ind > -1) {
          sauce.usersLiked.slice(ind, 1);
          Sauce.updateOne(
            { _id: thisSauceId },
            {$push: { usersLiked: {$each: [ ], $slice: ind} }, $inc: { likes: -1 },}
  
          )
          .then(() => res.status(200).json({ message: ' ' }))
          .catch((error) => res.status(400).json({ error }))
        } else if (ind === -1) {
          const indDisliked = sauce.usersDisliked.indexOf(userId);
          sauce.usersDisliked.slice(indDisliked, 1);
          Sauce.updateOne(
            { _id: thisSauceId },
            {$push: { usersDisliked: {$each: [ ], $slice: indDisliked} }, $inc: { dislikes: -1 },}
  
          )
          .then(() => res.status(200).json({ message: ' ' }))
          .catch((error) => res.status(400).json({ error }))
        }
      }*/
  
    })
    .catch((error) => res.status(500).json({ error}));
  
  }

  }