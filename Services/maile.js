const express = require('express');
const router = express.Router();
const request = require('request');
const nodemailer = require('nodemailer');
const cors = require('cors');
const User = require('../Models/User');

///nodemailer

let sendMail= async (req,res)=>{

    let transporter = nodemailer.createTransport({
           service : 'gmail',
           secure : false,
           port : 25,
           auth: {
    
                 user:'treetronix5@gmail.com',
                  pass: '20200200'
                   
           },
           tls:{
    
            rejectUnauthorized: false
           }
    
    
    });
    let HelperOptions = {
           from :'"TreeTronix" <treetronix5@gmail.com>',
            to:  'jawharjarboui77@yahoo.com',
          //  to:'${User.email}',
            subject:'hello world',
            text:'ca marche',
            html: `<h1>Hi ${User.firstName}</h1><br>
            <h4>vehicle is update</h4>`,
            attachments:[{
              filname:'123.jpg', path:'./123.jpg'
            }]
    
    };
    transporter.sendMail(HelperOptions,(error,info)=>{
    if(error){
      res.json({status: 'error'});
    
    }
    
    res.json({status: 'success'});
    console.log(info);
    });
    };
    
    
  
    module.exports = {

      sendMail : sendMail,
    }
