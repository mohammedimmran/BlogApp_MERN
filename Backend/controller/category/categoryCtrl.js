const expressAsyncHandler = require("express-async-handler");
const Category = require("../../model/Category/Category");
// const Post = require("../../model/post/Post");
// const User = require("../../model/user/User");
// const validateMongodbId = require("../../utils/validateMongodbID");

const createCategoryCtrl= expressAsyncHandler(async(req, res)=>{
    try {
        const category = await Category.create({

            user:req.user._id,
            title:req.body.title
        });
        res.json(category);

    } catch (error) {
        res.json(error);
    }
})

const fetchAllCategory = expressAsyncHandler(async(req, res)=>{

    try {
        const category = await Category.find({}).populate("user").sort("-createdAt");
        res.json(category);

    } catch (error) {
        res.json(error);
    }

});


const fetchCategory = expressAsyncHandler(async(req, res)=>{

    const {id} = req.params;
    try {
        const category = await Category.findById(id).populate("user").sort("-createdAt");
        res.json(category);

    } catch (error) {
        res.json(error);
    }

});

const updateCategoryCtrl= expressAsyncHandler(async(req, res)=>{
    const {id} = req.params;

    try {
        const category = await Category.findByIdAndUpdate(id ,{

          
            title:req.body.title
        },{
            new:true,
            runValidators:true
        });
        res.json(category);

    } catch (error) {
        res.json(error);
    }
})
const deleteCategoryCtrl = expressAsyncHandler(async(req, res)=>{

    const {id} = req.params;
    try {
        const deleteCategory = await Category.findByIdAndDelete(id);
        res.json(deleteCategory);
    } catch (error) {
        res.json(error)
        
    }
})
module.exports ={createCategoryCtrl,fetchAllCategory,fetchCategory , updateCategoryCtrl, deleteCategoryCtrl};