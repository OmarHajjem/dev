const express = require("express");
const router = express.Router({ mergeParams: true });
const posse= require("../Services/papier");



   // router.post('/pap',posse.Create);

    // Retrieve all vehicle
    router.get('/papio', posse.findAll);
    module.exports = router;
