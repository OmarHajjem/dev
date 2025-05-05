const express = require("express");
const router = express.Router({ mergeParams: true });
const licencess= require("../Services/historylicencess");



   router.post('/addlicences',licencess.Create);

    // Retrieve all vehicle
    router.get('/getlic', licencess.findAll);
    
    router.delete('/dellic/:id', licencess.delete);

    module.exports = router;
