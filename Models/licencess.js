
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Licenseess = new Schema({
    user:{type:String,required: true},
    nbrdev:Number,

    key: String,
    expired:  String,
   
    start:  String,
    name: String
    })
module.exports = mongoose.model('Licenseess', Licenseess);





 