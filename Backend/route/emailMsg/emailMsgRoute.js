const express = require('express');
const { sendEmailMsgCtrl } = require('../../controller/emailMsg/emailMsgCtrl');
const authMiddleware = require('../../middleware/error/auth/authMiddleware');
const emailMsgRoutes = express.Router();

emailMsgRoutes.post('/' , authMiddleware, sendEmailMsgCtrl );


module.exports =emailMsgRoutes;