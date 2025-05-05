var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let MechanicSchema = new Schema({
    id: {
        type: String
    },
    addresse: {
        type: String,
        trim: true,
        default: null,
        required: true
    },
    name: {
        type: String,
        trim: true,
        default: null,
        required: false
    },
    description: {

        type: String,
        trim: true,
        default: null,
        required: true
    },

    email: {
        type: String,
        trim: true,
        default: null,
        required: false

    }
});
module.exports = mongoose.model('Mechanic', MechanicSchema);