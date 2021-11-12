// Imports
const express = require('express');
const usersCtrl = require('./controllers/usersCtrl');
const postsCtrl = require('./controllers/postsCtrl');
const commentsCtrl = require('./controllers/commentsCtrl')




//Router
exports.router = (function() {
    const apiRouter = express.Router();
    //Users routes

    apiRouter.post('/users/register/', usersCtrl.register);/////
    apiRouter.post('/users/login/', usersCtrl.login);
    apiRouter.get('/users/userProfile/', usersCtrl.getUserProfile);
    apiRouter.put('/users/userProfile/', usersCtrl.updateUserProfile);
    apiRouter.delete('/users/userProfile/', usersCtrl.deleteProfile);
    
    //Posts routes
    apiRouter.post ('/posts/new', postsCtrl.createPost);
    apiRouter.get  ('/posts/', postsCtrl.listPosts);
    apiRouter.put  ('/posts/update/', postsCtrl.updatePost);
    apiRouter.delete('/posts/delete/', postsCtrl.deleteOnePost);
 
    //Comments routes
    apiRouter.post ('/comments/new', commentsCtrl.createComment);
//   apiRouter.delete ('/comments/delete', commentsCtrl.deleteComment);
    
                       //    ||    
    //Likes routes       for \/ specify name parameter
   // apiRouter.route('/posts/:postId/like').post(likesCtrl.likePost);
   // apiRouter.route('/posts/:postId/dislike').post(likesCtrl.dislikePost);
    //apiRouter.route('/posts/:id/like').post(likeOrDislikePost.likeOrDislikePost);
    return apiRouter;
})();


