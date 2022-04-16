
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
// storage
const multerStorage = multer.memoryStorage();

// filetype
// cb:callback
const multerFilter = (req,file , cb) => {

    if(file.mimetype.startsWith("image")){
        cb(null,true)
    }
    else{
        cb({
            message:"Unsupported file format"
        },false);
    }

};

const photoUpload = multer({
    storage: multerStorage,
    fileFilter:multerFilter,
    limits:{fileSize:1000000}
});


const profilePhotoResize =async (req , res , next)=>{

    // check if there is no file to resize
    if(!req.file) return next();
    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;

    // console.log("Resizing" , req.file);
    var resize =req.file.filename;
    // console.log(resize);
    // await sharp(req.file.buffer).resize(250,250).toFormat("jpeg").jpeg({ quality:90}).toFile(path.join(`public/images/profile/${req.file.fileame}`));

    await sharp(req.file.buffer).resize(250,250).toFormat("jpeg").jpeg({ quality:90}).toFile(path.join(`public/images/profile/${resize}`));


    next();


    console.log("Resizing" , req.file);
}

// post image resize
const postImageResize =async (req , res , next)=>{

    // check if there is no file to resize
    if(!req.file) return next();
    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;

    // console.log("Resizing" , req.file);
    var resize =req.file.filename;
    // console.log(resize);
    // await sharp(req.file.buffer).resize(250,250).toFormat("jpeg").jpeg({ quality:90}).toFile(path.join(`public/images/profile/${req.file.fileame}`));

    await sharp(req.file.buffer).resize(500,500).toFormat("jpeg").jpeg({ quality:90}).toFile(path.join(`public/images/post/${resize}`));


    next();


    console.log("Resizing" , req.file);
}
module.exports = {photoUpload , profilePhotoResize, postImageResize};
