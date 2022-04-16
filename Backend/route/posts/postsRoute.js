const express = require('express');
const { createPostCtrl, fetchPostsCtrl,fetchPostCtrl ,updatePostCtrl , deletePostCtrl,toggleAddLikeToPostCtrl,toggleAddDislikeToPostCtrl} = require('../../controller/posts/postCtrl');
const authMiddleware = require('../../middleware/error/auth/authMiddleware');
const { photoUpload, postImageResize } = require('../../middleware/error/uploads/photoUpload');

// const { postImageResize } = require('../../middleware/uploads/photoUpload');
const postRoute = express.Router();

postRoute.post('/' ,authMiddleware,photoUpload.single('image'),postImageResize, createPostCtrl);
postRoute.put('/likes',authMiddleware , toggleAddLikeToPostCtrl);
postRoute.put('/dislikes',authMiddleware , toggleAddDislikeToPostCtrl);
postRoute.get('/' ,fetchPostsCtrl);
postRoute.get('/:id' ,fetchPostCtrl);
postRoute.put('/:id',authMiddleware , updatePostCtrl);
postRoute.delete('/:id',authMiddleware , deletePostCtrl);


module.exports = postRoute;

