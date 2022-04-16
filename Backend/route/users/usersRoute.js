const express = require('express');
const { userRegisterCtrl , loginUserCtrl,fetchUserCtrl , deleteUserCtrl ,
     fetchUserDetailsCtrl ,userProfileCtrl , userUpdateProfileCtrl
    , updateUserPasswordCtrl , followingUserCtrl , unfollowUserCtrl , blockUserCtrl ,
     unblockUserCtrl , sendEmailCtrl , accountVerificationCtrl,forgetPasswordToken,passwordResetctrl,profilePhotoUploadCtrl} = require('../../controller/users/usersCtrl');
const authMiddleware = require('../../middleware/error/auth/authMiddleware');
const { photoUpload ,profilePhotoResize} = require('../../middleware/error/uploads/photoUpload');

const usersRoute = express.Router();

usersRoute.post('/register' , userRegisterCtrl);
usersRoute.post('/login' ,loginUserCtrl );
usersRoute.get('/' ,authMiddleware ,fetchUserCtrl );
usersRoute.post('/forget-password-token' ,forgetPasswordToken);
usersRoute.put('/reset-password' ,passwordResetctrl);
usersRoute.put('/profilephoto-upload' ,authMiddleware,photoUpload.single('image'), profilePhotoResize,profilePhotoUploadCtrl)
usersRoute.put('/block-user/:id'  ,authMiddleware ,blockUserCtrl);
usersRoute.put('/unblock-user/:id'  ,authMiddleware ,unblockUserCtrl);
usersRoute.post('/password' , authMiddleware ,updateUserPasswordCtrl);
usersRoute.put('/follow'  ,authMiddleware ,followingUserCtrl);
usersRoute.post('/generate-verify-email-token' , authMiddleware ,sendEmailCtrl);
usersRoute.put('/verify-account' , authMiddleware ,accountVerificationCtrl);

usersRoute.put('/unfollow'  ,authMiddleware ,unfollowUserCtrl);
usersRoute.get('/profile/:id' ,authMiddleware, userProfileCtrl );
usersRoute.put('/:id' , authMiddleware ,userUpdateProfileCtrl);
// api/users/password
usersRoute.delete('/:id' ,deleteUserCtrl );
usersRoute.get('/:id' ,fetchUserDetailsCtrl );




module.exports =usersRoute;
