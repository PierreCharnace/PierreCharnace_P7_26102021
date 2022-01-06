// Imports
const express = require('express');
const usersCtrl = require('./controllers/usersCtrl');
const postsCtrl = require('./controllers/postsCtrl');
const commentsCtrl = require('./controllers/commentsCtrl')
const multer = require('./middleware/multer-config');



//Router
exports.router = (function() {
    const apiRouter = express.Router();
    //Users routes

    apiRouter.post('/users/register/', multer, usersCtrl.register);/////
    apiRouter.post('/users/login/', usersCtrl.login);
    apiRouter.get('/users/userProfile/', usersCtrl.getUserProfile);
    apiRouter.get('/users/allUsers/', usersCtrl.getAllProfile);
    apiRouter.put('/users/userProfile/', multer, usersCtrl.updateUserProfile);
    apiRouter.delete('/users/userProfile/:id', usersCtrl.deleteProfile);
    
    //Posts routes
    apiRouter.post ('/posts/new', multer, postsCtrl.createPost);
    apiRouter.get  ('/posts/', postsCtrl.listPosts);
    apiRouter.delete('/posts/delete/:id', postsCtrl.deleteOnePost);

    //Comments routes
    apiRouter.post ('/:id/comments/new', commentsCtrl.createComment);
    apiRouter.get ('/comments/', commentsCtrl.listComments);
    apiRouter.delete ('/comments/delete/:id', commentsCtrl.deleteComment);
    
    return apiRouter;
})();


