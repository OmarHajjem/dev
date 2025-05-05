const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose.set('useFindAndModify', false);
const License = mongoose.model(
  'License',
  // eslint-disable-next-line no-undef
  (LicenseSchema = new mongoose.Schema({
    key: String,
    expired: Date,
    nbrdev:Number,
   
    start: {
        type: Date,
        trim: true,
        default:Date.now(),
         required: false
    },
    name: String
  }))
);

module.exports = License;
