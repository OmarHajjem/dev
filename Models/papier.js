
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Papier = new Schema({
    firstName: {
        type: String,
        default: null,
        required: false
    },
    lastName: {
        type: String,
        trim: true,
        default: null
    },
    date:{
        type:Date,
        default:null,
        required:false
    }})
module.exports = mongoose.model('Papier', Papier);
