// Imports
const express = require('express');
const usersCtrl = require('./routes/usersCtrl');
const postsCtrl = require('./routes/postsCtrl');
const likesCtrl = require('./routes/likesCtrl')

//Router
exports.router = (function() {
    const apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/userProfile/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/userProfile/').put(usersCtrl.updateUserProfile);
    
    //Posts routes
    apiRouter.route('/posts/new').post(postsCtrl.CreatePost);
    apiRouter.route('/posts/').get(postsCtrl.listPosts);
                       //    ||    
    //Likes routes       for \/ specify name parameter
    
    apiRouter.route('/posts/:postId/like').post(likesCtrl.likePost);
    apiRouter.route('/posts/:postId/dislike').post(likesCtrl.dislikePost);
    return apiRouter;
})();


