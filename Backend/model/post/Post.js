const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type: 'string',
        required:[true,'Post Title is required'],
        trim:true,
    },
    category: {
        type: 'string',
        required: [true,'Post categpry is required'],
        // default: 'All',
    },
    isLiked:{
        type: Boolean,
        default: false,

    },
    isDisLiked:{
        type: Boolean,
        default: false,
        
    },
    numViews:{
        type:Number,
        default:0,
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }, 
    ],
    dislikes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }, 
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Please Author is Required"],
    },
    description:{
        type:String,
        required:[true,"Post Description is Required"],
    },
    image:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2020/07/08/04/12/work-5382501_960_720.jpg"
    },
   


    
},{
    toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals:true,
    },
    timestamps:true,
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;