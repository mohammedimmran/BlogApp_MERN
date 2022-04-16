const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/Post");
const validateMongodbId = require("../../utils/validateMongodbID");

// file system
const fs = require("fs");

// to avoid usage of bad words 
var Filter = require('bad-words');
const User = require("../../model/user/User");
const cloudinaryUploadImg = require("../../utils/cloudinary");

const createPostCtrl =expressAsyncHandler(async(req, res)=>{
    // console.log(req.file)

    const {_id} = req.user;
    // const {_id} =req.user;
    validateMongodbId(req.body.user);
    // check for bad words
    
    const filter = new Filter();

    const isProfane = filter.isProfane(req.body.title , req.body.description);
    // block user

    if(isProfane){
        const user = await User.findByIdAndUpdate(_id,{
            isBlocked:true,
        });
        throw new Error("creating failed because it contains profane words anf ou have neen blocked")
    }
  



    // console.log(isProfane);

    const localPath = `public/images/post/${req.file.filename}`;
    // upload to cloudinary
    const imgUploaded = await cloudinaryUploadImg(localPath);


    // console.log(req.body);
  
    try {
        const post = await Post.create({...req.body,category:req.body.category,
                                        image:imgUploaded?.url,
                                        user:_id});
        res.json(post);

        // /removelocal images
        fs.unlinkSync(localPath);
    } catch (error) {
        res.json(error);
    }
});


const fetchPostsCtrl = expressAsyncHandler(async(req, res) => {
    const hasCategory = req.query.category;
    console.log(hasCategory)

    try {
        // if we use below code only user id will be fetched
        // const post = await Post.find({});
        // 'if we want to fetch the users details then we can use populate() function'
        // by using this along with user id we can get all user information
        if(hasCategory){
            console.log(hasCategory)
            const post = await Post.find({category:hasCategory}).populate("user");
            res.json(post);

        }else{
            const post = await Post.find({}).populate("user");
            res.json(post);
        }
      
    } catch (error) {
        
    }
    // res.json("all post");

});
// fetch single post
const fetchPostCtrl = expressAsyncHandler(async(req, res) =>{

    // console.log(id)
    const {id}=req.params;
    validateMongodbId(id);
    console.log(id)
    try {
        // const post = await Post.findById(id);
        const post = await Post.findById(id).populate('user').populate("dislikes").populate("likes");
        //update number of views 
        await Post.findByIdAndUpdate(id,{
            // increment number of views using $inc by 1
            $inc:{numViews: 1}
        },{
            new:true
        })
        res.json(post);
    } catch (error) {
        res.json(error);
    }


    // res.json("single post")
})

const updatePostCtrl = expressAsyncHandler(async(req, res) => {
    const {id}=req.params;
    validateMongodbId(id);

    try {
        const post = await Post.findByIdAndUpdate(id,{
            // title: req.body.title,
            // description: req.body.description
            
            // or

            ...req.body,
            user:req.user?._id,
        },{
            new:true
        })
        res.json(post);
    } catch (error) {
        res.json(error);
    }
})

// delete post
const deletePostCtrl = expressAsyncHandler(async(req, res)=>{
    const {id}=req.params;
    validateMongodbId(id);

    try {
        const post = await Post.findByIdAndDelete(id);
        res.json("deleted");
    } catch (error) {
        res.json(error);
    }

});

const toggleAddLikeToPostCtrl = expressAsyncHandler(async(req, res)=>{
    // res.json("likes")
    // find the post id
    const {postId}=req.body;

    try {
        // find the post using id
        const post = await Post.findById(postId);
        // find the login user id
        const loginUserId= req?.user?._id;

        // find is this user has liked this pos or not

        const isLiked = await post?.isLiked;

        //check if the user has disliked this post
        
        const alreadyDisliked = await post?.dislikes?.find(userId=>userId?.toString() === loginUserId?.toString());

        if(alreadyDisliked){
            const post = await Post.findByIdAndUpdate(postId,{
                $pull:{dislikes:loginUserId},
                isDisliked:false,
            },{
                new:true
            }
        );
        res.json(post);
        }
        // console.log(alreadyDisliked);
        // res.json(post)

        if(isLiked){
            const post = await Post.findByIdAndUpdate(postId,{
                $pull:{likes:loginUserId},
                isLiked:false,
            },{
                new:true
            }
        );
        res.json(post);

        }
        else{
            const post = await Post.findByIdAndUpdate(postId,{
                $push:{likes:loginUserId},
                isLiked:true,
            },{
                new:true
            }
            );
            res.json(post)
        }
    } catch (error) {
        res.json(error);
    }


});

const toggleAddDislikeToPostCtrl = expressAsyncHandler(async(req, res)=>{
    // res.json("likes")
    // find the post id
    const {postId}=req.body;

    try {
        // find the post using id
        const post = await Post.findById(postId);
        // find the login user id
        const loginUserId= req?.user?._id;

        // find is this user has disliked this pos or not

        const isDisliked = await post?.isDisLiked;

        //check if the user has liked this post

        const alreadyLiked = await post?.likes?.find(userId=>userId?.toString() === loginUserId?.toString());

        if(alreadyLiked){
            const post = await Post.findByIdAndUpdate(postId,{
                $pull:{likes:loginUserId},
                isLiked:false,
            },{
                new:true
            }
        );
        res.json(post);
        }
        // console.log(alreadyDisliked);
        // res.json(post)

        if(isDisliked){
            const post = await Post.findByIdAndUpdate(postId,{
                $pull:{dislikes:loginUserId},
                isDisLiked:false,
            },{
                new:true
            }
        );
        res.json(post);

        }
        else{
            const post = await Post.findByIdAndUpdate(postId,{
                $push:{dislikes:loginUserId},
                isDisLiked:true,
            },{
                new:true
            }
            );
            res.json(post)
        }
    } catch (error) {
        res.json(error);
    }


});



module.exports = {createPostCtrl , fetchPostsCtrl , fetchPostCtrl , updatePostCtrl,deletePostCtrl,toggleAddLikeToPostCtrl,toggleAddDislikeToPostCtrl};