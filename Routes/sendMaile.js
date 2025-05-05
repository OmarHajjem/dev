const express = require('express');
const router = express.Router();
const request = require('request');
const nodemailer = require('nodemailer');
const cors = require('cors');
const User = require('../Models/User');

var crypto = require('crypto');
const md5 = require('md5');


var Cryptr = require('cryptr');
cryptr = new Cryptr('devnami');
var encstring = cryptr.encrypt('decccc');
var decstring = cryptr.decrypt(encstring); 


router.post("/request",async (req,res) => {
    try {
      const NewUser = await User.find({ email : req.body.email  });
      if (NewUser.length < 1)
      {
        await res.json({status: "err", message: 'Email Does not Exists'});
      }
      else {

       
     const cryptedString =   require('crypto').createHash('md5').update('text to hash').digest('hex');
     //const decryptedString = cryptr.decrypt(NewUser[0].password);

        var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'treetronix5@gmail.com',
            pass: '20200200'
          }
        });
  
        var mailOptions = {
          from: '"TreeTronix" <treetronix5@gmail.com>',
          to: req.body.email,
          subject: "Paramètres du compte",
          text: ' Bonjour ' + NewUser[0].username +  ' ,\n' +
              '      Login:' + NewUser[0].email + '\n' +
              '      Pwd:' + cryptedString + '\n' +
              '      Cordialement.\n' +
              '      N.B: ceci est un mail automatique merci de ne pas répondre.' ,
        };
      res.json(NewUser) ;
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error.toString());
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
    } catch (err) {
      res.json({ status: "not ok",message: err.toString()})
  
    }
  
  });
  module.exports = router;
  /*
  
  onSubmit() {
    this.submitted = true;
    if (this.requestForm.valid) {
      this.http.post('api/users/request',
        {
          email: this.requestForm.get('email').value,
        }).subscribe(data => {
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        if (resJSON.status === 'err') {
          this.msg = 'wrong email';
        } else {
          this.msg = '';
          this.router.navigate(['/auth/login']);
        }
      });
    }

  }
  
  
  */