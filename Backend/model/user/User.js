const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')

// schema
const userSchema = new mongoose.Schema({
    firstName:{
        required: [true,'First Name is required'],
        type: String,
    },
    lastName:{
        required: [true,'Last Name is required'],
        type: String,
    },
    profilePhoto:{
        type: String,
        default:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    },
    email:{
        type: String,
        required: [true,'Email is required']
    },
    bio:{
        type: String,
    },
    password:{
        type: String,
        required: [true,'Password is required']
    },
    postCount:{
        type: Number,
        default: 0,
    },
    isBlocked:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['Admin','Guest' , 'Blogger'],
    },
    isFollowing:{
        type:Boolean,
        default:false,
    },
    isUnFollowing:{
        type:Boolean,
        default:false,
    },
    isAccountVerified:{
        type:Boolean,
        default:false,
    },
    accountVerificationToken:{
        type:String,
    },
    accountVerificationTokenExpires:{
        type:Date,
    },
    viewedBy:{
        // dataAssociation
        // provide array
        // ids of users are inserted in type
        // and referencing to User Model and only their id are stored 

        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        ],
    },
    followers:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        ],
        
    },
    following:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        ],
        
    },
    passwordChangedAt:{
        type:Date
    },
    passwordResetToken:String,
    passwordResetExpires:Date,
    active:{
        type:Boolean,
        default:false,
    }

},{
    toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals:true,
    },
    timestamps:true,
   }
);

// middleware
// hashpassword
userSchema.pre('save', async function (next) {
  
    if(!this.isModified("password")){
        next();
    }
    const salt =await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);

    next();

});
// if we want to know all the post which are created by user then we can use populate()
// by this we will create a virual link
// virtual method to populate created post
userSchema.virtual('post',{
    ref:'Post',
    foreignField:'user',
    localField:'_id',
})

// match password
userSchema.methods.isPasswordMatched = async function (enterPassword){
    return await bcrypt.compare(enterPassword, this.password);

};

// verify account
userSchema.methods.createAccountVerificationToken = async function(){
    const verificationToken = crypto.randomBytes(32).toString("hex");

    this.accountVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

    this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000; //10 minutes

    return verificationToken;


};

// password reset/forgot

userSchema.methods.createPasswordResetToken = async function(){
    const resetToken = crypto.randomBytes(32).toString("hex");

    // console.log(resetToken);
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000;

    return resetToken;

}




const User = mongoose.model('User' , userSchema);
module.exports = User;