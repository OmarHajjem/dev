var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let position = new Schema({
date: {
        type: Date,
        trim: true,
        default:Date.now(),
         required: true
    },
lon: {
        type: Number,
        trim: true,
        default: null,
        required: true
    },
 lat: {
        type: Number,
        trim: true,
        default: null,
        required: true
    }});
    module.exports = mongoose.model('Position', position);
