
const config = require("../Utilities/config").config;
const Licenseess = require("../Models/licencess");



exports.Create = (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
   

   let licence = new Licenseess({
       user:req.body.user,
       nbrdev:req.body.nbrdev,
    key: req.body.key,
    expired: req.body.expired,
    start:req.body.start,
    name:req.body.name

      
    });





    licence.save()
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

    Licenseess.find()
        .then(Licenseess => {
            return res.status(200).json({ result: Licenseess, code: 0, message: null });
        }).catch(err => {
            return res.status(500).send({
                result: null,
                code: 1000,
                message: err.message || "Some error occurred while retrieving notes."
            });
        });


};
exports.delete = (req, res) => {

    Licenseess.findByIdAndRemove(req.params.id)
        .then(Licenseess => {

            if (!Licenseess) {
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

