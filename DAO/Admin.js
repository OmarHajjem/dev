"use strict";

var Models = require("../Models/Utilisateur");

const getadmins = criteria =>
  new Promise((resolve, reject) => {
    Models.find(criteria)
      .then(client => resolve(client))
      .catch(err => reject(err));
  });

const createadmin = objToSave =>
  new Promise((resolve, reject) => {
    new Models(objToSave)
      .save()
      .then(client => resolve(client))
      .catch(err => {reject(err);
         console.log(err);
      });
  });

const updateadmin = (criteria, dataToSet, options) =>
  new Promise((resolve, reject) => {
    options.lean = true;
    options.new = true;
    Models.findOneAndUpdate(criteria, dataToSet, options)
      .then(client => resolve(client))
      .catch(err => reject(err));
  });

const deleteadmin = criteria =>
  new Promise((resolve, reject) => {
    Models.findOneAndRemove(criteria)
      .exec()
      .then(client => resolve(client))
      .catch(err => reject(err));
  });


module.exports = {
    updateadmin: updateadmin,
  createadmin: createadmin,
  deleteadmin: deleteadmin,
  getadmins:getadmins
};