const expressAsyncHandler = require('express-async-handler');
const EmailMsg = require('../../model/EmailMessaging/EmailMessaging');
const nodemailer = require('nodemailer');
const sendEmailMsgCtrl = expressAsyncHandler(async(req,res) => {

    const {to , subject, message} = req.body;

    console.log(subject);
    console.log(message);
    console.log(to);
    const from =req?.user?.email;
    try {
        // send email message
        
      
      
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
            from: from,
            to: to,
            subject: subject,
            text: message,
            // html:resetUrl,
          };
            
          transporter.sendMail(mailConfigurations, function(error, info){
            if (error) throw Error(error);
            console.log('Email Sent Successfully');
            // console.log(info);
          });

      

        // save to db

        const email = await EmailMsg.create({
            sentBy:req?.user?._id,
            fromEmail:"peerconnect2022@gmail.com",
            toEmail:to,
            message:message,
            subject:subject,
        })
        res.json(email);
    } catch (error) {
        res.json({ error})
    }


});

module.exports = {sendEmailMsgCtrl};