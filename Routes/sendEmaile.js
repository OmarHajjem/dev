const express = require('express');
const router = express.Router();
const request = require('request');
const nodemailer = require('nodemailer');
const cors = require('cors');
const User = require('../Models/User');
const Vehicle = require('../Models/Vehicule');
var crypto = require('crypto');
const md5 = require('md5');


var Cryptr = require('cryptr');
cryptr = new Cryptr('devnami');
var encstring = cryptr.encrypt('decccc');
var decstring = cryptr.decrypt(encstring); 
router.post("/mailo",(req,res)=>{
  const {to,nom,marque,numero,eng,battrie,temp,carb,text}=req.body;
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'treetronix5@gmail.com',
      pass: '20200200'
    }
  });

  const maildata={
    from: '"TreeTronix" <treetronix5@gmail.com>',
          to: to,
          subject: "Diagnostic Véhicule" ,
          text: ' Bonjour  Mr '+ nom+'\n ' +
                ' .\n'+ 
              '   Le résultat de diagnostic pour le véhicule "'+marque +'" avec le  numéro de série '+numero+' est  :\n' +
              '   Engine light  : '+eng +'\n' +
              '   Charge Batterie  :'+battrie +'\n' +
              '   Température:'+temp +'\n' +
              '   Niveau Carburant :'+carb +'\n' +
              ' \n'+ 
              ' \n'+ 
              

              


              'Cordialement  .\n' +
              
              

              'Remarque : Ce message est généré automatiquement du système , merci de ne pas répondre à cet email.' ,

  }
  transporter.sendMail(maildata, function (error, info) {
    if (error) {
      console.log(error.toString());
    } else {
      res.status(200).send({message:"message bien jawo behy !"})
      console.log('Email sent: ' + info.response);
    }
  });
});


//*********************************************** */

router.post("/lic",(req,res)=>{
  const {to,message,nom ,num}=req.body;
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'treetronix5@gmail.com',
      pass: '20200200'
    }
  });

  const maildata={
    from: '"TreeTronix" <treetronix5@gmail.com>',
          to: 'treetronixt@gmail.com',
          subject: "Demande de renouvellement de licence Treecars" ,
          text:
          ' Bonjour  Mr \n ' +
                ' .\n'+ 
              '   Votre client '+nom+'vous demande une clé de licence treecars \n'+
              '   il envoie ce message '+message+'\n'+
              '   Son adresse mail est   : '+to +'\n' +
              '   son Numéro de téléphone est: '+num +'\n' +
              
              ' \n'+ 
              ' \n'+ 
              

              


              'Cordialement  .\n' 
              

              


             

  }
  transporter.sendMail(maildata, function (error, info) {
    if (error) {
      console.log(error.toString());
    } else {
      res.status(200).send({message:"message bien jawo behy !"})
      console.log('Email sent: ' + info.response);
    }
  });
});





router.post("/request",async (req,res) => {
    try {
      const NewUser = await User.find({ email : req.body.email  });
      const NewVehicle = await Vehicle.findOne(Vehicle.registerNumber);
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
          text: ' Bonjour  ,\n' +
              '      This vehicle : is needed of maintenance\n' +
              '      cordially.\n' +
              '      P.S: this is an automatic email please do not respond.' ,
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