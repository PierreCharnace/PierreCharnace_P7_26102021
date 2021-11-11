// Imports
const express = require('express');
const usersCtrl = require('./controllers/usersCtrl');
const postsCtrl = require('./controllers/postsCtrl');
//const likesCtrl = require('./controllers/likesCtrl');
//const multer = require('../middleware/multer-config');



//Router
exports.router = (function() {
    const apiRouter = express.Router();

    //Users routes

    apiRouter.post('/users/register/', /*multer,*/ usersCtrl.register);/////
    apiRouter.post('/users/login/', usersCtrl.login);
   // apiRouter.get("/logout", userCtrl.logout);
   // apiRouter.get("/desactivateAccount/:id", userCtrl.desactivateAccount);
    apiRouter.get('/users/userProfile/', usersCtrl.getUserProfile);
    apiRouter.put('/users/userProfile/', usersCtrl.updateUserProfile);
    
    //Post routes
    apiRouter.post ('/posts/new', postsCtrl.createPost);
    apiRouter.get  ('/posts/', postsCtrl.listPosts);
    apiRouter.put  ('/posts/update/:id', postsCtrl.updatePost);
    apiRouter.delete('/posts/delete/:id', postsCtrl.deleteOnePost);
 
    
    
                       //    ||    
    //Likes routes       for \/ specify name parameter
   // apiRouter.route('/posts/:postId/like').post(likesCtrl.likePost);
   // apiRouter.route('/posts/:postId/dislike').post(likesCtrl.dislikePost);
    //apiRouter.route('/posts/:id/like').post(likeOrDislikePost.likeOrDislikePost);
    return apiRouter;
})();


