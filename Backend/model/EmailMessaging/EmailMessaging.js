const mongoose = require('mongoose');

const emailMessageSchema = new mongoose.Schema({

    fromEmail:{
        type: 'string',
        required: true,
    },
    toEmail:{
        type: 'string',
        required: true,
    },
    message:{
        type: 'string',
        required: true,
    },
    subject:{
        type: 'string',
        required: true,
    },
    sentBy:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    isFlagged:{
        type:Boolean,
        default:false,
    },

},{
    timestamps:true,
})

const EmailMsg = mongoose.model('EmailMsg' , emailMessageSchema);

module.exports = EmailMsg;
