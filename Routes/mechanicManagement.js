const express = require("express");
const router = express.Router({ mergeParams: true });
const mechanicService = require("../Services/mechanicManagement");



    // Create a new vehicle
    /*app.post('/vehicle',function(req,res){
        vehicleService.Create
    } );
*/
    router.post('/mechanics',mechanicService.Create);

    // Retrieve all vehicle
    router.get('/mechanics', mechanicService.findAll);

     ////statistiques
    //router.get('/vehicle', vehicleService.Statistique);


    // Retrieve a single vehicle with vehicleId
    router.get('/mechanics/:mechanicId', mechanicService.findOne);

    // Update a vehicle with vehicleId
    router.put('/mechanics/:mechanicId', mechanicService.update);

    // Delete a vehicle with vehicleId
    router.delete('/mechanics/:mechanicId', mechanicService.delete);
    
    module.exports = router;
