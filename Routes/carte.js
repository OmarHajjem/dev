const express = require("express");
const router = express.Router({ mergeParams: true });
const posservice = require("../Services/carte");



    router.post('/positions',posservice.Create);

    // Retrieve all vehicle
    router.get('/getpos', posservice.findAll);
    module.exports = router;
