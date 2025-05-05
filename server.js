/**
 * Module dependencies.
 */
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const request = require('request');
const cors = require('cors');
var User = require('./Models/User');
var Vehicle=require('./Models/Vehicule');
var Mechanic=require('./Models/Mechanic');
var papier=require('./Models/papier');
const vehicleService = require("./Services/vehicleManagement");
const router = express.Router({ mergeParams: true });





var lisD = require('./Models/Device');
var debug = require('debug');
var  msg;
//var http = require('http');
var kafka = require('kafka-node');
// var mongoose1 = require('mongoose');

//var Kafka = require('no-kafka');
//const express = require('express');
//var router = express.Router();
//var lisD = require('../../models/device');
const http = require('http').createServer(express);
const io = require('socket.io')(http);


const mongoose = require('./Utilities/mongooseConfig')();

const authRoute = require('./Routes/auth');
const pap = require('./Routes/Papier');
const maint =require('./Routes/vehicleManagement')


const sendMail = require('./Routes/sendMaile');
const sendEmaile = require('./Routes/sendEmaile');

const vehicleRoute = require('./Routes/vehicleManagement');
const carteRoute=require('./Routes/carte');
const mechanicRoute = require('./Routes/mechanicManagement');
const licence = require('./Routes/licence');
const historylicences = require('./Routes/hostorylisence');



const config = require("./Utilities/config").config;
const MaileRouter = require("./Routes/maile");
app.use(express.static(path.join(__dirname, '/dist/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));



app.use(cors({origin:"*"}));

app.use((err, req, res, next) => {
  return res.send({
    "statusCode": 401,
    "statusMessage": "Something Went Wrong!"
  });
});

app.use('/auth', authRoute);
app.use('',vehicleRoute);
app.use('',mechanicRoute);
app.use('',MaileRouter);
app.use('',MaileRouter);
app.use('',pap);
app.use('',maint);
app.use('',licence);
app.use('',historylicences);



app.use('/mail',sendMail);
app.use('/maile',sendEmaile);
app.use('',carteRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next();
});


//////kafka
var id = '607f6fd785d9724cb0e90345';

/*


Vehicle.find( function (err, docs) {
  if (err){
      console.log(err);
  }
  else{
      console.log("Result aaaaaaaaaaaaaaa: ", docs.length);
     for(var i=0;i<docs.length;i++){
       if(docs[i].referenceSensor==3333333333333333)
{
       var t =docs[i]._id
       var quoteText = `${t}`

       console.log("rrrrrrrrrrrrr"+ quoteText)
       

        {Vehicle.findByIdAndUpdate(quoteText, { new: true })
        .then(vehicle => {
          console.log("step1"+vehicle.historyCoordiantes)
            const newHC = vehicle.historyCoordiantes.concat({ "lon":30.008044667612964,
        
            "lat":10.74845720541112 });
            //console.log('kkkkkklkk', newHC);
            Vehicle.findByIdAndUpdate(quoteText, {
                historyCoordiantes: newHC
                
        
            },).then(veh => {
              //console.log("stepppppppppppppppppppp"+veh.historyCoordiantes)
            })
            
        }) };
        docs[i].historyCoordiantes.lon=36.800654698718155;
        docs[i].historyCoordiantes.lat=20.21554
      }
    
     }
  }
});



*/
console.log("allll")


try {
  //+vehicleService.findAll().result);

  Consumer = kafka.Consumer,
      client = new kafka.KafkaClient({kafkaHost: '193.95.76.211:9092'}),
      consumer = new Consumer(
          client,
          [
              {topic: 'AS.Treetronix.v1', partition: 0}
          ],
          {
              autoCommit: true
          }
      );
  consumer.on('message', function (message) {
    
    

     console.log(message);
   
    /* 
  if (JSON.parse(message.value).DevEUI_uplink.DevEUI === '3333333333333333' ){


    Vehicle.find( function (err, docs) {
      if (err){
          console.log(err);
      }
      else{
          console.log("Result aaaaaaaaaaaaaaa: ", docs.length);
         for(var i=0;i<docs.length;i++){
           if(docs[i].referenceSensor==3333333333333333)
    {
           var t =docs[i]._id
           var quoteText = `${t}`
    
           console.log("rrrrrrrrrrrrr"+ quoteText)
           
    
            {Vehicle.findByIdAndUpdate(quoteText, { new: true })
            .then(vehicle => {
              console.log("step1"+vehicle.historyCoordiantes)
                const newHC = vehicle.historyCoordiantes.concat({ "lon":JSON.parse(message.value).DevEUI_uplink.CustomerData.loc.lat,
            
                "lat":JSON.parse(message.value).DevEUI_uplink.CustomerData.loc.lon });
                //console.log('kkkkkklkk', newHC);
                Vehicle.findByIdAndUpdate(quoteText, {
                    historyCoordiantes: newHC
                    
            
                },).then(veh => {
                  //console.log("stepppppppppppppppppppp"+veh.historyCoordiantes)
                })
                
            }) };
          
          }
        
         }
      }
    });

 
      console.log(message);
      
      console.log((JSON.parse(message.value).DevEUI_uplink.CustomerData.loc)); }*/

  });
  consumer.on('error', function (err) {
      console.log('error', err);
  });
} catch (e) {
  console.log(e);

}



async function vv(x) {
  
  var y = JSON.parse(x.value);

  // console.log(message);
  msg.push(y)
  console.log("jojojojoj"+y),

  list = msg;
  console.log('rrrrrr', list[(list.length - 1)].DevEUI_uplink.DevEUI);
  if (list[(list.length - 1)].DevEUI_uplink.DevEUI === '8888888888888888' || list[(list.length - 1)].DevEUI_uplink.DevEUI === '7777777777777777') {
      // list[(list.length - 1)].DevEUI_uplink.DevEUI === 'CCCCCCCCCCCCCCCC'
      // var output = list.filter(function(value) { return value.DevEUI_uplink.DevEUI == "004A77012404D36E"; })

      lisD.create(list[(list.length - 1)], function(err, temps) {

          if (err) {
              console.log(err);
              // terminate request/response cycle
              return res.send('Error saving');
          }
      });
      io.emit('vv', Array.from({ length: 1 }, () => [list[(list.length - 1)].DevEUI_uplink.DevEUI, list[(list.length - 1)].DevEUI_uplink.Time, list[(list.length - 1)].DevEUI_uplink.payload_hex]));
      setTimeout(() => {}, 2000)
     // décryptage(list);



  }
}
/*
var list = new lisD();



http.listen(5000, () => {
    console.log("listning to port bb 3000");
    vv();

});

io.on('connection', (socket) => {
    console.log("Client Connected");

})


const client = new kafka.KafkaClient({ kafkaHost: '193.95.76.211:9092' });
msg = [];
console.log("Initialised..");
const topics = [{
    topic: 'AS.Treetronix.v1',
    offset: 0, //default 0
    partition: 0 // default 0
}];


const options = {
    autoCommit: true
};

const consumer = new kafka.Consumer(client, topics, options);

consumer.setMaxListeners(11);

consumer.on("ready", function(message) {
    console.log("I am ready");
});


console.log('rrrrrrrrrrrrr', msg);
consumer.on("error", function(err) {
    console.log("error", err);
});


try{
consumer.on("message", function(message) {
    console.log("Hey got message");
    console.log(JSON.parse(message.value));
    vv(message);

});
}catch(err)
{console.log('errrrrrrrs',err)}



async function vv(x) {
  
  var y = JSON.parse(x.value);

  // console.log(message);
  msg.push(y);

  list = msg;
  console.log('rrrrrr', list[(list.length - 1)].DevEUI_uplink.DevEUI);
  if (list[(list.length - 1)].DevEUI_uplink.DevEUI === '8888888888888888' || list[(list.length - 1)].DevEUI_uplink.DevEUI === '7777777777777777') {
      // list[(list.length - 1)].DevEUI_uplink.DevEUI === 'CCCCCCCCCCCCCCCC'
      // var output = list.filter(function(value) { return value.DevEUI_uplink.DevEUI == "004A77012404D36E"; })

      lisD.create(list[(list.length - 1)], function(err, temps) {

          if (err) {
              console.log(err);
              // terminate request/response cycle
              return res.send('Error saving');
          }
      });
      io.emit('vv', Array.from({ length: 1 }, () => [list[(list.length - 1)].DevEUI_uplink.DevEUI, list[(list.length - 1)].DevEUI_uplink.Time, list[(list.length - 1)].DevEUI_uplink.payload_hex]));
      setTimeout(() => {}, 2000)
     // décryptage(list);



  }
}*/









///nodemailer
/*
app.post('/sendemail',function(req,res){

let transporter = nodemailer.createTransport({
       service : 'gmail',
       secure : false,
       port : 25,
       auth: {

             user:'saidhmidi96@gmail.com',
              pass: 'SAIDhmidi1996jj'
               
       },
       tls:{

        rejectUnauthorized: false
       }


});
let HelperOptions = {
       from :'"TreeTronix" <saidhmidi96@gmail.com>',
        to:'said.hmidi@esprit.tn',
        subject:'hello world',
        text:'ca marche',
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
});

*/


// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname + '/dist/index.html'));
// });

/**
 * Start Express server.
 */
server.listen(config.NODE_SERVER_PORT.port, () => {
  console.log('app listening on port:' + config.NODE_SERVER_PORT.port);
  console.log("daaaaaaaaaaaaaaaaate"+(new Date()).getDate())

});
