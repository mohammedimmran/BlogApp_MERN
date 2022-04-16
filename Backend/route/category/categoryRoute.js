const express = require('express');
const { createCategoryCtrl, fetchAllCategory, fetchCategory, updateCategoryCtrl, deleteCategoryCtrl } = require('../../controller/category/categoryCtrl');
const authMiddleware = require('../../middleware/error/auth/authMiddleware');
const categoryRoutes = express.Router();

categoryRoutes.post('/' , authMiddleware , createCategoryCtrl);
categoryRoutes.get('/',authMiddleware,fetchAllCategory )
categoryRoutes.get('/:id' , authMiddleware, fetchCategory );
categoryRoutes.put('/:id' , authMiddleware , updateCategoryCtrl );
categoryRoutes.delete('/:id' , authMiddleware ,deleteCategoryCtrl )

module.exports =categoryRoutes;