const licenseKey = require('license-key-gen');
const express = require('express');
const Licensee = require('./../models/licenses');

let expiredIn;
const ONE_DAY = 1000;
const router = express.Router();

let licen;
const userInfo = {
  company: 'Treetronix.tn'
};



exports.addlicence = (req, res) => {
  const licenseData = {
    info: userInfo,
    prodCode: Math.floor(Math.random() * 1000000000),
    appVersion: '1.5',
    osType: 'WIN10'
  };
  try {

    this.licen = licenseKey.createLicense(licenseData);
    const lic = this.licen;
    console.log(lic);
  } catch (err) {
    console.log(err);
  }
  if (!req.body) {
      return res.status(400).json({
          result: null,
          code: 0,
          message: "Note content can not be empty"
      });
  }


  const lice = new Licensee({
    nbrdev:req.body.nbrdev,
    key: this.licen.license,
    start: Date.now(),
    expired: req.body.expired,
    name: 'Licence'
  });
  lice.save()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).json({

              code: 0,
              message: err.message || "Some error occurred while creating the Note.",
              result: null
          });
      });
};
/*
exports.addlicence = async (req, res) => {
  const site = new Licensee({
    key: this.licen.license,
    start: Date.now(),
    expired: req.body.expired,
    name: 'Licence'
  });

  try {
    Licensee.findOne({ key: this.licen.license }, async function(
      err,
      foundObject
    ) {
      if (foundObject) {
        res.json({ status: 'err', message: 'licence already exists' });
      } else {
        site
          .save()
          .then(item => {
            res.json({
              status: 'success',
              mesage: 'licence saved to database'
            });
          })
          .catch(err => {
            res.status(400).send('unable to save to database');
          });
      }
    });
  } catch (e) {
    console.log('error site Data', e);
  }
};*/


exports.getLicence = (req, res) => {

  Licensee.find()
      .then(Licensee => {
          return res.status(200).json({ result: Licensee, code: 0, message: null });
      }).catch(err => {
          return res.status(500).send({
              result: null,
              code: 1000,
              message: err.message || "Some error occurred while retrieving notes."
          });
      });


};
exports.updateLicence = async (req, res) => {
  try {
    const updated = await Licensee.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          expired: req.body.expired,
          name: req.body.name
        }
      },

      { new: true, useFindAndModify: false }
    )
    .then(docs => {
        res.status(200).json(docs);
      });
    console.log('ok');
    console.log(req.params.id);
  } catch (err) {
    console.log(err);

    res.json({ message: err });
  }
};
exports.delete = (req, res) => {

  Licensee.findByIdAndRemove(req.params.id)
      .then(Licensee => {

          if (!Licensee) {
              return res.status(404).json({
                  code: 1001,
                  message: "mechanic note found with id" + req.params.id,
                  result: null
              });
          }
          return res.status(200).json({});
      }).catch(err => {

          if (err.kind === 'ObjectId' || err.addresse === 'NotFound') {
              return res.status(404).json({
                  code: 1001,
                  message: "mechanic note found with id" + req.params.id,
                  result: null
              });
          }
          return res.status(500).json({
              code: 1001,
              result: null,
              message: "Could not delete mechanic with id " + req.params.id
          });
      });
};

