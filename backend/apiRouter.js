// Imports
const express = require('express');
const usersCtrl = require('./controllers/usersCtrl');
const postsCtrl = require('./controllers/postsCtrl');
const likesCtrl = require('./controllers/likesCtrl');
//const multer = require('../middleware/multer-config');
const auth = require('./middleware/auth');


//Router
exports.router = (function() {
    const apiRouter = express.Router();

    //Users routes

    apiRouter.post('/users/register/', /*multer,*/ usersCtrl.register);/////
    apiRouter.post('/users/login/', usersCtrl.login);
    apiRouter.get('/users/userProfile/', auth, usersCtrl.getUserProfile);
    apiRouter.put('/users/userProfile/', auth, usersCtrl.updateUserProfile);
    
    //apiRouter.delete('/delete/:id', auth, postsCtrl.deletePost);////// ALL ROUTES AND WHAT THEY DOING
    //router.get('/', auth, saucesCtrl.getAllSauces);////
    //apiRouter.route('/user/userProfile').delete(usersCtrl.deleteUserProfile);
    //Posts routes
    apiRouter.post('/posts/new', auth, postsCtrl.CreatePost);
    apiRouter.get('/posts/', auth, postsCtrl.listPosts);
                       //    ||    
    //Likes routes       for \/ specify name parameter
    apiRouter.route('/posts/:postId/like').post(likesCtrl.likePost);
    apiRouter.route('/posts/:postId/dislike').post(likesCtrl.dislikePost);
    //apiRouter.route('/posts/:id/like').post(likeOrDislikePost.likeOrDislikePost);
    return apiRouter;
})();


