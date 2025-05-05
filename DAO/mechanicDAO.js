var models = require("../Models/Mechanic");


const getMechanic= criteria=>
new  new Promise((resolve, reject)=>{
    Models.find(criteria)
    .then(client => resolve(client))
    .catch(err => reject(err));

});


const createMechanic = objToSave =>
  new Promise((resolve, reject) => {
    new Models(objToSave)
      .save()
      .then(client => resolve(client))
      .catch(err => {reject(err);
         console.log(err);
      });
  });

  const updateMechanic = (criteria, dataToSet, options) =>
  new Promise((resolve, reject) => {
    options.lean = true;
    options.new = true;
    Models.findOneAndUpdate(criteria, dataToSet, options)
      .then(client => resolve(client))
      .catch(err => reject(err));
  });

const deleteMechanic = criteria =>
  new Promise((resolve, reject) => {
    Models.findOneAndRemove(criteria)
      .exec()
      .then(client => resolve(client))
      .catch(err => reject(err));
  });


module.exports = {
  updateMechanic: updateMechanic,
  createMechanic: createMechanic,
  deleteMechanic: deleteMechanic,
  getMechanic: getMechanic
};

