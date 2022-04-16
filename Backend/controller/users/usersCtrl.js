const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const validateMongodbId = require("../../utils/validateMongodbID");
const crypto = require("crypto");
// email
const nodemailer = require('nodemailer');
const cloudinaryUploadImg = require("../../utils/cloudinary");
// const secure_configuration = require('secure');

const fs = require('fs');


const userRegisterCtrl =expressAsyncHandler(async (req , res)=>{

  //  res.json({user:"User registered"});
  //   console.log(res.body)
  // chck if user exists already
  const email = req.body.email;
  const userexists = await User.findOne({email});
  console.log(userexists)
  if(userexists) throw new Error(" User already exists");
  
  try {
          const user = await User.create({
              firstName:req?.body?.firstName,
              lastName:req?.body?.lastName,
              email:req?.body?.email,
              password:req?.body?.password
          });
         
          res.json(user);
     } 
     catch (error) {
       res.json(error);
         
     }
      
  
  });



// login user
const loginUserCtrl = expressAsyncHandler(async(req, res)=>{
  const{email , password} = req.body;

  const userFound = await User.findOne({email});
  
  if(userFound && (await userFound.isPasswordMatched(password))){


    res.json({
      _id:userFound?._id,
      firstName:userFound?.firstName,
      lastName:userFound?.lastName,
      email:userFound?.email,
      profilePhoto:userFound?.profilePhoto,
      isAdmin:userFound?.isAdmin,
      token:generateToken(userFound?._id)
    });
  }else{
    res.status(401);
    throw new Error("invalid login details");
  }
 
});

// fetch users
const fetchUserCtrl = expressAsyncHandler(async (req , res)=>{
  try{
    const users = await User.find({});
    res.json(users);
  }catch(error){
    res.json(error)
  }

})

// delete user
const deleteUserCtrl = expressAsyncHandler(async (req, res)=>{
  const {id}=req.params;
  // if(!id) throw new Error("please provide id")
  validateMongodbId(id);

  try {
    const deletedUsers = await User.findByIdAndDelete(id);
    res.json(deletedUsers);
  } catch (error) {
    res.json(error);
  }
})



// fetch single user details
const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res)=>{
  const {id}=req.params;
  // check if valid _id
  validateMongodbId(id);
  console.log(id)
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
})




//user profile
const userProfileCtrl = expressAsyncHandler(async (req, res)=>{
  const {id}=req.params;
  validateMongodbId(id);
  try {
    // if we want to fetch only User model details use below code
    // const myProfile = await User.findById(id);
    // if we want to fetch user deatails and also their posts created then use populate() function
    // by this there will be a virtual link 
    const myProfile =  await User.findById(id).populate('post');
    res.json(myProfile);

    
  } catch (error) {
    res.json(error);
  }
})



//userUpdateProfile
const userUpdateProfileCtrl = expressAsyncHandler(async (req, res)=>{
  // console.log(req.user);
  // destructuring and getting only id form req.user
  const {_id} = req?.user;
  // console.log(_id)
  validateMongodbId(_id);

  const user = await User.findByIdAndUpdate(_id , {
    firstName: req?.body?.firstName,
    lastName: req?.body?.lastName,
    email: req?.body?.email,
    bio: req?.body?.bio
  } , {
    new:true,
    runValidators:true,
  });

  // res.json("Profile");
  res.json(user)

})


// update password
// it should work for put but its not working  put and working for post try to fix this

const updateUserPasswordCtrl = expressAsyncHandler(async (req, res)=>{
  // const {_id} = req.user;
  
  const {_id} = req?.user;
  // console.log(req.user);
  const {password} = req.body;
  validateMongodbId(_id);
  // // find the user by _id
  const user = await User.findById(_id);

  if(password){
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser)

  }
  res.json(user);

  
})


// following and follower

const followingUserCtrl = expressAsyncHandler(async (req , res)=>{

  
 
  // find the user you want to follow and update its followers field
  // update the login user following field
  const {followId} = req.body
  const loginUserId = req.user.id;
  // console.log(loginUserId);
  // console.log(followId);


  // first check whether user is already following 
  const targetUser = await User.findById(followId);
  const alreadyFollowing = targetUser?.followers?.find(user =>user?.toString() == loginUserId.toString());
  // console.log(alreadyFollowing)
  if(alreadyFollowing){
    throw new Error("Already following");
  }




  await User.findByIdAndUpdate(followId,{
    $push:{followers:loginUserId},
    isFollowing:true,
  },{new : true})

  await User.findByIdAndUpdate(loginUserId,{
    $push:{following:followId},
  } , {new : true})
  res.json("yes now r following");

})

// unfollow

const unfollowUserCtrl =  expressAsyncHandler(async (req , res)=>{
  const {unfollowId} = req.body
  const loginUserId = req.user.id;
  await User.findByIdAndUpdate(unfollowId, {
    $pull:{followers:loginUserId},
    isFollowing:false,
  }, {new : true})

  await User.findByIdAndUpdate(loginUserId, {
    $pull:{following:unfollowId},
    
  }, {new : true})

  res.json("yes now r unfollow");

})

// block user
const blockUserCtrl = expressAsyncHandler(async (req, res)=>{
  const {id}=req.params;
  

  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(id, {
    isBlocked:true

  }, {new : true});

  res.json(user)
});

// unblock
const unblockUserCtrl = expressAsyncHandler(async (req, res)=>{
  const {id}=req.params;
  

  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(id, {
    isBlocked:false

  }, {new : true});

  res.json(user)
});

// *********************************************************************************************
// send email for verification
// *********************************************************************************************

const sendEmailCtrl = expressAsyncHandler(async (req , res)=>{
  const loginUserId = req.user.id;
  // console.log(loginUserId);
  const user = await User.findById(loginUserId);
  // console.log(user)
  const verificationToken = await user.createAccountVerificationToken();
  await user.save();

  // console.log(verificationToken);

  const resetUrl = `If you were reqested to verify your account, please verify your account now within 10 minutes, else ignore
  <a href="http://localhost:3000/verify-account/${verificationToken}">click here </a>`;


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // type: 'OAuth2',
      user: "peerconnect2022@gmail.com",
      pass: process.env.PASSWORD,
      // clientId: secure_configuration.CLIENT_ID,
      // clientSecret: secure_configuration.CLIENT_SECRET,
      // refreshToken: secure_configuration.REFRESH_TOKEN
    }
    });
    
    const mailConfigurations = {
      from: 'peerconnect2022@gmail.com',
      to: 'myselfmdimran@gmail.com',
      subject: 'Sending Email using Node.js',
      // text: 'Hi! There, You know I am using the NodeJS '
      // + 'Code along with NodeMailer to send this email.'
      html:resetUrl,
    };
      
    transporter.sendMail(mailConfigurations, function(error, info){
      if (error) throw Error(error);
      // console.log('Email Sent Successfully');
      // console.log(info);
    });

    // res.json("email sent successfully");
    res.json(resetUrl);


})

// *********************************************************************************************
// account verification
// *********************************************************************************************
const accountVerificationCtrl = expressAsyncHandler(async (req , res)=>{
  const  { token }  = req.body;
  // console.log(req)
  // console.log(token);
  const hashedToken  = crypto.createHash('sha256').update("89d6557c0e357c65cb87a38796dc1a82bf3d97ee4bf128eaafa73c7e34117ff6").digest('hex');
  // console.log(hashedToken);

  const userFound = await User.findOne({
    accountVerificationToken:hashedToken,
    accountVerificationTokenExpires:{ $gt:new Date()},
  });
  if(!userFound) throw new Error("token expired , try again later");
  //update the property to true
  userFound.isAccountVerifiedn = true;
  userFound.accountVerificationToken= undefined;
  userFound.accountVerificationTokenExpires = undefined;
  await userFound.save()


  res.json(userFound);
});

// *********************************************************************************************
// generate token and send this to uswr mail
//take token find user by token

// forget password token generater
// *********************************************************************************************
const  forgetPasswordToken = expressAsyncHandler(async (req , res)=>{
  // find user by email
  const {email} = req.body;
  // console.log(email);
  const user = await User.findOne({email: email});
  if(!user) throw new Error("no user found");
  // res.send("forget password ")

  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    // console.log(token)

    // send email
    
  const resetUrl = `If you were reqested to reset your password, please reset your account now within 10 minutes, else ignore
  <a href="http://localhost:3000/reset-password/${token}">click here </a>`;


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // type: 'OAuth2',
      user: "peerconnect2022@gmail.com",
      pass: process.env.PASSWORD,
      // clientId: secure_configuration.CLIENT_ID,
      // clientSecret: secure_configuration.CLIENT_SECRET,
      // refreshToken: secure_configuration.REFRESH_TOKEN
    }
    });
    
    const mailConfigurations = {
      from: 'peerconnect2022@gmail.com',
      to: 'myselfmdimran@gmail.com',
      subject: 'Reset your password',
      // text: 'Hi! There, You know I am using the NodeJS '
      // + 'Code along with NodeMailer to send this email.'
      html:resetUrl,
    };
      
    transporter.sendMail(mailConfigurations, function(error, info){
      if (error) throw Error(error);
      // console.log('Email Sent Successfully');
      // console.log(info);
    });

    
    // res.json(resetUrl);
    res.json({
      msg:`A verification message is successfully sent to ${user.email} reset your password ${resetUrl}`
    });

    // res.json("forgot password")
  } catch (error) {
    res.json(error);
  }
})
// *********************************************************************************************
// password reset
// *********************************************************************************************

const passwordResetctrl = expressAsyncHandler(async (req , res)=>{
  const  { token ,password }  = req.body;
  // console.log(req)
  // console.log(token);
  const hashedToken  = crypto.createHash('sha256').update(token).digest('hex');
  // console.log(hashedToken);
  const userFound = await User.findOne({
    passwordResetToken:hashedToken,
    passwordResetExpires:{ $gt:new Date()}
  });

  if(!userFound) throw new Error("token expired , try again later");

  // update or change password
  userFound.password = password;
  userFound.passwordResetToken= undefined;
  userFound.passwordResetExpires = undefined;

  await userFound.save();
  res.json(userFound)

})
// *********************************************************************************************
// profile photo upload
// Multer
// Multer is a node.js middleware for handling multipart/form-data,
//  which is primarily used for uploading files. 
// *********************************************************************************************

const profilePhotoUploadCtrl = expressAsyncHandler(async (req , res)=>{
  // get the path to image 

  // console.log(req.user);
  const {_id} = req.user;
 
  const localPath = `public/images/profile/${req.file.filename}`;
  // upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);
  console.log(req.file)
  // res.json("Success Fully uploaded")
  // res.json(req.file)
  const foundUser = await User.findByIdAndUpdate(_id,{
    profilePhoto: imgUploaded.url,
  } , {new:true})

  // remove the local saved image once uploaded to cloudinary
  fs.unlinkSync(localPath);
  // console.log(imgUploaded)
  res.json(imgUploaded);
})



module.exports = {userRegisterCtrl , loginUserCtrl , fetchUserCtrl,deleteUserCtrl ,
                  fetchUserDetailsCtrl , userProfileCtrl , userUpdateProfileCtrl,
                  updateUserPasswordCtrl , followingUserCtrl , unfollowUserCtrl , blockUserCtrl , 
                  unblockUserCtrl , sendEmailCtrl , accountVerificationCtrl,forgetPasswordToken,passwordResetctrl,
                  profilePhotoUploadCtrl
                  
};

