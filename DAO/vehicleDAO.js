var models = require("../Models/Vehicule");


const getVehicle= criteria=>
new  new Promise((resolve, reject)=>{
    Models.find(criteria)
    .then(client => resolve(client))
    .catch(err => reject(err));

});


const createVehicle = objToSave =>
  new Promise((resolve, reject) => {
    new Models(objToSave)
      .save()
      .then(client => resolve(client))
      .catch(err => {reject(err);
         console.log(err);
      });
  });

  const updateVehicle = (criteria, dataToSet, options) =>
  new Promise((resolve, reject) => {
    options.lean = true;
    options.new = true;
    Models.findOneAndUpdate(criteria, dataToSet, options)
      .then(client => resolve(client))
      .catch(err => reject(err));
  });

const deleteVehicle = criteria =>
  new Promise((resolve, reject) => {
    Models.findOneAndRemove(criteria)
      .exec()
      .then(client => resolve(client))
      .catch(err => reject(err));
  });


module.exports = {
  updateVehicle: updateVehicle,
  createVehicle: createVehicle,
  deleteVehicle: deleteVehicle,
  getVehicle: getVehicle
};

