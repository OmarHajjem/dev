const config = require("../Utilities/config").config;
const mechanicDAO = require('../DAO/mechanicDAO');
const MD5 = require('md5');
const Mechanic = require("../Models/Mechanic");


exports.Create = (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }


    const mechanic = new Mechanic({
        addresse: req.body.addresse,
        name: req.body.name,
        description: req.body.description,
        email: req.body.email
    });





    mechanic.save()
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

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

    Mechanic.find()
        .then(mechanics => {
            return res.status(200).json({ result: mechanics, code: 0, message: null });
        }).catch(err => {
            return res.status(500).send({
                result: null,
                code: 1000,
                message: err.message || "Some error occurred while retrieving notes."
            });
        });


};

// Find a single vehicle with a vehicleId
exports.findOne = (req, res) => {

    Mechanic.findById(req.params.mechanicId)
        .then(mechanic => {
            if (!mechanic) {
                return res.status(404).json({
                    message: "mechanic not found with ID" + req.params.mechanicId,
                    result: null,
                    code: 1000
                });

            }
            return res.json({
                result: mechanic,
                code: 0,
                message: null
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "mechanic not found with ID" + req.params.mechanicId
                });
            }
            return res.status(500).json({
                result: null,
                code: 0,
                message: "Error retrieving note with id " + req.params.mechanicId
            });
        });


};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Mechanic.findByIdAndUpdate(req.params.mechanicId, {
        addresse: req.body.addresse,
        name: req.body.name,
        description: req.body.description,
        email: req.body.email



    }, { new: true })
        .then(mechanic => {
            Mechanic.findByIdAndUpdate(req.params.mechanicId, {
            
            }, { new: true })
                .then(mechanicUpdated => {
                    if (!mechanicUpdated) {
                        return res.status(404).json({
                            result: null,
                            code: 0,
                            message: "Mechanic not found with id" + req.params.mechanicId
                        });
                    }
                    return res.json({
                        result: mechanicUpdated,
                        code: 0,
                        message: null
                    });
                }).catch(err => {
                    return res.status(500).json({
                        result: null,
                        code: 1000,
                        message: "Error updating mechanic with id " + req.params.mechanicId
                    });
                });
        }).catch(err => {

            if (err.kind === 'ObejectId') {

                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "mechanic not found with id" + req.params.mechanicId
                });
            }
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating mechanic with id " + req.params.mechanicId
            });

        });

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

    Mechanic.findByIdAndRemove(req.params.mechanicId)
        .then(mechanic => {

            if (!mechanic) {
                return res.status(404).json({
                    code: 1001,
                    message: "mechanic note found with id" + req.params.mechanicId,
                    result: null
                });
            }
            return res.status(200).json({});
        }).catch(err => {

            if (err.kind === 'ObjectId' || err.addresse === 'NotFound') {
                return res.status(404).json({
                    code: 1001,
                    message: "mechanic note found with id" + req.params.mechanicId,
                    result: null
                });
            }
            return res.status(500).json({
                code: 1001,
                result: null,
                message: "Could not delete mechanic with id " + req.params.mechanicId
            });
        });
};