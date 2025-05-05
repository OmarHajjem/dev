
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let ALERT = new Schema({
    vehid: {
        type: String,
        default: null,
        required: false
    },
    chauffeur: {
        type: String,
        default: null,
        required: false
    },
    
    alerdepvit: {
        type: {type:String},
        date:{ type:Date}

    },
    alertplagehori: {
        type: {type:String},
        date:{ type:Date}
    },
    alertperimetre:{
        type: {type:String},
        date:{ type:Date}
    },
    alertmaintenance:{
        type: {type:String},
        date:{ type:Date}
    },
    alertdeplacement:{
        type: {type:String},
        date:{ type:Date}
    },
    alertnivcarburant:{
        type: {type:String},
        date:{ type:Date}
    }})
module.exports = mongoose.model('ALERT', ALERT);
