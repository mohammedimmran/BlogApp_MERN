const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comments/Comment");
const Post = require("../../model/post/Post");
const validateMongodbId = require("../../utils/validateMongodbID");

const createCommentCtrl = expressAsyncHandler(async(req, res)=>{
    const user = req.user;
    const {postId , description} = req.body;

    console.log(user);
    console.log(postId);
    console.log(description);
    try {
        const comment = await Comment.create({
            post: postId,
            user: user,
            description: description,
        });

        res.json(comment);
    } catch (error) {
        res.json(error)
    }

    // res.json("comment")
})

const fetchAllCommentsCtrl = expressAsyncHandler(async(req, res)=>{

    try {
    
        // to display in ascending order
        const comments = await Comment.find({}).sort("-created");
        
        res.json(comments)
    } catch (error) {
        res.json(error)
    }
    // res.json("All comments")


})

const fetchCommentCtrl  = expressAsyncHandler(async(req, res)=>{

    const {id} = req.params;
    validateMongodbId(id);

    try {
        const comment = await Comment.findById(id);
        res.json(comment)
    } catch (error) {
        res.json(error)
    }

});


const updateCommentCtrl  = expressAsyncHandler(async(req, res)=>{

    const user = req.user;
    const {postId , description} = req.body;

    const {id} = req.params;
    validateMongodbId(id);

    try {
        const update = await Comment.findByIdAndUpdate(id,{
            post: postId,
            user: user,
            description: description,
        },{
            new: true,
            runValidators:true,
        });
        res.json(update)
    } catch (error) {
        res.json(error)
    }

})


const deleteCommentCtrl  = expressAsyncHandler(async(req, res)=>{

 

    const {id} = req.params;
    validateMongodbId(id);

    try {
        const deleteComment = await Comment.findByIdAndDelete(id);
        res.json(deleteComment)
    } catch (error) {
        res.json(error)
    }

});


module.exports ={createCommentCtrl, fetchAllCommentsCtrl,fetchCommentCtrl , updateCommentCtrl , deleteCommentCtrl};