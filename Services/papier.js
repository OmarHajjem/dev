

const config = require("../Utilities/config").config;
const Papier = require("../Models/papier");



exports.Create = (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }


   let papier = new Papier({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        date:req.body.date
      
    });





    papier.save()
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

    Papier.find()
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

