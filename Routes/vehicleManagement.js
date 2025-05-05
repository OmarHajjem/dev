const express = require("express");
const router = express.Router({ mergeParams: true });
const vehicleService = require("../Services/vehicleManagement");



    // Create a new vehicle
    /*app.post('/vehicle',function(req,res){
        vehicleService.Create
    } );depasementvitesse
*/
    router.post('/vehicles',vehicleService.Create);
    router.put('/depassvitesse/:vehicleId',vehicleService.depassvitesse);

    // Retrieve all vehicle
    router.get('/vehicles', vehicleService.findAll);
    //put plage horaire  plagehoraire
    router.put('/plagehoraire/:vehicleId',vehicleService.plagehoraire);
    //put Perimetre
    router.put('/Perimetre/:vehicleId',vehicleService.Perimetre);
    //put alert vehicle
    router.put('/alertveh/:vehicleId',vehicleService.alertveh);
    //put notification
    router.put('/not/:vehicleId',vehicleService.vtm);
    //put notfication plage horaire plg
    router.put('/notplg/:vehicleId',vehicleService.plg);
    //put notification perimetre de loc perm
    router.put('/permi/:vehicleId',vehicleService.perm);







     ////statistiques
    //router.get('/vehicle', vehicleService.Statistique);


    // Retrieve a single vehicle with vehicleId
    router.get('/vehicles/:vehicleId', vehicleService.findOne);
    
    router.get('/papier/:vehicleId', vehicleService.papier);
    
    router.get('/vehicles/:vehicleId/reglementpap/:papierId', vehicleService.deletepap);
    router.get('/vehicles/:vehicleId/maintenance/:papierId', vehicleService.deletmain);

    router.get('/mainetnance/:vehicleId', vehicleService.maintenance);
    //getmain
  router.get('/getmain/:vehicleId', vehicleService.getmain);
  router.get('/getdiagnostic/:vehicleId', vehicleService.getdiagnostic);


    router.get('/getcord/:vehicleId', vehicleService.getcord);
    router.get('/vehofuser/:id',vehicleService.getallvehbyuser);
    router.get('/gatmaintenanceofadmin/:id',vehicleService.getallmaintenancevehbyuser);

  
    // Update a vehicle with vehicleId
    router.put('/vehicles/:vehicleId', vehicleService.update);
    //diagnostic
    router.put('/diagbatt/:vehicleId', vehicleService.diagbatt);
    router.put('/diagtemp/:vehicleId', vehicleService.diagtem);
    router.put('/diagfeuel/:vehicleId', vehicleService.diagfeuel);


    router.put('/veh/:vehicleId', vehicleService.updc);
    router.put('/pap/:vehicleId',vehicleService.upadatePapier);
    router.put('/maint/:vehicleId',vehicleService.upadatemaintenance);
    router.put('/cord/:vehicleId',vehicleService.upadatecordinate);

    router.put('/diag/:vehicleId',vehicleService.diag);

   



    // Delete a vehicle with vehicleId
    router.delete('/vehicles/:vehicleId', vehicleService.delete);
    
    module.exports = router;
