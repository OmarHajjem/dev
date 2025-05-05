

var Models = require("../Models/carte");

const getpos = criteria =>
  new Promise((resolve, reject) => {
    Models.find(criteria)
      .then(client => resolve(client))
      .catch(err => reject(err));
  });

const addpos = objToSave =>
  new Promise((resolve, reject) => {
    new Models(objToSave)
      .save()
      .then(client => resolve(client))
      .catch(err => {reject(err);
         console.log(err);
      });
  });

  module.exports = {
    getpos: getpos,
    addpos: addpos,
    
  };