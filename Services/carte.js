

const config = require("../Utilities/config").config;
const carteDAO = require('../DAO/carteDAO');
const MD5 = require('md5');
const Position = require("../Models/carte");




exports.Create = (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }


    const position = new Position({
        lon: req.body.lon,
        lat: req.body.lat
      
    });





    position.save()
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

// Re



exports.findAll = (req, res) => {

    Position.find()
        .then(positions => {
            return res.status(200).json({ result: positions, code: 0, message: null });
        }).catch(err => {
            return res.status(500).send({
                result: null,
                code: 1000,
                message: err.message || "Some error occurred while retrieving notes."
            });
        });


};