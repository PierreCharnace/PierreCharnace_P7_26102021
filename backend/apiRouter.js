// Imports
const express = require('express');
const usersCtrl = require('./controllers/usersCtrl');
const postsCtrl = require('./controllers/postsCtrl');
const commentsCtrl = require('./controllers/commentsCtrl')
const multer = require('./middleware/multer-config');
const auth = require('./middleware/auth');



//Router
exports.router = (function() {
    const apiRouter = express.Router();
    //Users routes

    apiRouter.post('/users/register/', multer, usersCtrl.register);/////
    apiRouter.post('/users/login/', usersCtrl.login);
    apiRouter.get('/users/userProfile/', auth, usersCtrl.getUserProfile);
    //apiRouter.get('/users/allUsers/', auth, usersCtrl.findAll);
    apiRouter.put('/users/userProfile/:id', auth, multer, usersCtrl.updateUserProfile);
    apiRouter.delete('/users/userProfile/:id', auth, usersCtrl.deleteProfile);
    
    //Posts routes
    apiRouter.post ('/posts/new', auth, multer, postsCtrl.createPost);
    apiRouter.get  ('/posts/', auth, postsCtrl.listPosts);
    apiRouter.delete('/posts/delete/:id', auth, postsCtrl.deleteOnePost);
 
    //Comments routes
    apiRouter.post ('/:id/comments/new', auth, commentsCtrl.createComment);
    apiRouter.get ('/comments/', auth, commentsCtrl.listComments);
    apiRouter.delete ('/:id/comments/delete', auth, commentsCtrl.deleteComment);
    
    return apiRouter;
})();


