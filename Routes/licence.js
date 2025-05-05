const express = require('express');

const licence = require('../Services/lisence');

const router = express.Router();
router.route('/addlicence').post(licence.addlicence);
router.route('/getlicence').get(licence.getLicence);
router.route('/updatelicence/:id').put(licence.updateLicence);
router.delete('/deletelic/:id',licence.delete);


module.exports = router;
