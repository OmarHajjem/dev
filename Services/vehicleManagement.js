const config = require("../Utilities/config").config;
const vehicleDAO = require('../DAO/vehicleDAO');
const MD5 = require('md5');
const Vehicle = require("../Models/Vehicule");
//const reglementpap=require("../Models/Vehicule");


/**API for Vehicle */
//Add


/*
let statistique = async (req, res) => {

    VehiculesNumber=find("id",vehicle._id).count(vehicles => {
        return res.status(200).json({ result: vehicles, code: 0, message: null });
    }).catch(err => {
        return res.status(500).send({
            result: null,
            code: 1000,
            message: err.message || "Some error occurred while retrieving notes."
        });
    });


};
*/

exports.Create = (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }


    const vehicle = new Vehicle({
        marque: req.body.marque,
        category: req.body.category,
        referenceSensor: req.body.referenceSensor,
        admin:req.body.admin,
        
      
      
        driver: req.body.driver,
        registration_number: req.body.registration_number,
     
    });
/*
Papier:{
        Categorie : String,
        Date : Date,
        Dure : Number,
      },
*/




    vehicle.save()
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
exports.getallvehbyuser= (req, res) => {

    Vehicle.find()
        .then(vehicles => {
            var userMap = {};
            var k=0

            vehicles.forEach(function(vehicle) {
                if(vehicle.admin==req.params.id)
              // userMap[k]=vehicle;
               k++;

              });
            return res.status(200).json({ result:k, code: 0, message: null });
        }).catch(err => {
            return res.status(500).send({
                result: null,
                code: 1000,
                message: err.message || "Some error occurred while retrieving notes."
            });
        });


};
exports.getallmaintenancevehbyuser= (req, res) => {

    Vehicle.find()
        .then(vehicles => {
            var userMap = {};
            var k=0

            vehicles.forEach(function(vehicle) {
                if(vehicle.admin==req.params.id){
                  k+=vehicle.maintenance.length


                }
              // userMap[k]=vehicle;
               

              });
            return res.status(200).json({ result:k, code: 0, message: null });
        }).catch(err => {
            return res.status(500).send({
                result: null,
                code: 1000,
                message: err.message || "Some error occurred while retrieving notes."
            });
        });


};



// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

    Vehicle.find()
        .then(vehicles => {

            return res.status(200).json({ result: vehicles, code: 0, message: null });
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

    Vehicle.findById(req.params.vehicleId)
        .then(vehicle => {
            if (!vehicle) {
                return res.status(404).json({
                    message: "vehicle not found with ID" + req.params.vehicleId,
                    result: null,
                    code: 1000
                });

            }
            return res.json({
                result: vehicle,
                code: 0,
                message: null
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with ID" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 0,
                message: "Error retrieving note with id " + req.params.vehicleId
            });
        });


};
//delete entretien



exports.deletmain = (req, res) => {Vehicle.findByIdAndUpdate(req.params.vehicleId, { new: true })
.then(vehicle => {
   // console.log('newHC = ', newHC);
    Vehicle.findByIdAndUpdate(req.params.vehicleId, {
        maintenance: vehicle. maintenance.pull(req.params.papierId )
        
    }, { new: true })
        .then(vehicleUpdated => {
            if (!vehicleUpdated) {
                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with id" + req.params.vehicleId
                });
            }
            return res.json({
                result: vehicleUpdated,
                code: 0,
                message: null
            });
        }).catch(err => {
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating vehicle with id " + req.params.vehicleId
            });
        });
}).catch(err => {

    if (err.kind === 'ObejectId') {

        return res.status(404).json({
            result: null,
            code: 0,
            message: "vehicle not found with id" + req.params.vehicleId
        });
    }
    return res.status(500).json({
        result: null,
        code: 1000,
        message: "Error updating vehicle with id " + req.params.vehicleId
    });

});

};
//delete papier

exports.deletepap = (req, res) => {Vehicle.findByIdAndUpdate(req.params.vehicleId, { new: true })
.then(vehicle => {
   // console.log('newHC = ', newHC);
    Vehicle.findByIdAndUpdate(req.params.vehicleId, {
        reglementpap: vehicle.reglementpap.pull(req.params.papierId )
        
    }, { new: true })
        .then(vehicleUpdated => {
            if (!vehicleUpdated) {
                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with id" + req.params.vehicleId
                });
            }
            return res.json({
                result: vehicleUpdated,
                code: 0,
                message: null
            });
        }).catch(err => {
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating vehicle with id " + req.params.vehicleId
            });
        });
}).catch(err => {

    if (err.kind === 'ObejectId') {

        return res.status(404).json({
            result: null,
            code: 0,
            message: "vehicle not found with id" + req.params.vehicleId
        });
    }
    return res.status(500).json({
        result: null,
        code: 1000,
        message: "Error updating vehicle with id " + req.params.vehicleId
    });

});

};/* //Vehicle.updateOne( {cn: req.params.vehicleId},{ reglementpap.pull({ _id: 4815162342 })} )
Vehicle.findById(req.params.vehicleId)
        .then(vehicle => { vehicle.reglementpap.pull(req.params.papierId )
            vehicle.findByIdAndUpdate(req.params.vehicleId, {
                reglementpap:  vehicle.reglementpap.pull(req.params.papierId )});
            if (!vehicle) {
                return res.status(404).json({
                    message: "vehicle not found with ID" + req.params.vehicleId,
                    result: null,
                    code: 1000
                });

            }else( vehicle.reglementpap.pull(req.params.papierId ))
            return res.json({
                result: vehicle.reglementpap.pull(req.params.papierId ),
                code: 0,
                message: null
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with ID" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 0,
                message: "Error retrieving note with id " + req.params.vehicleId
            });
        });


};

   /* exports.deletepap = function (req, res, next) {
    
    
    //Vehicle.findById(req.params.vehicleId).reglementpap.deleteById( req.params.papierId);
   // Vehicle.updateOne( {id: req.params.vehicleId}, {reglementpap:{$pull: {uid: [req.params.papierId] }} } )
    /*Vehicle.findOne({'_id' : req.params.vehicleId}, function(err, me){
           for(var i=0; i<=me.reglementpap.length; i++){
            if (String(me.reglementpap[i])==String(req.params.deleteUid) ){
                me.reglementpap.remove(String(req.params.deleteUid));{} 
                 //me.save(callback);
                break;                          
            }
        }
        me.save(function(err,us){
            next(err,'kljlmjk'+JSON.stringify(me));
        });    
    });    */
   // exports.deleteFavorite = function (req, res, next) {
     /*   if (req.params.callback !== null) {
            res.contentType = 'application/javascript';
        }
        // Changed to findOne instead of find to get a single document with the favorites.
           // Vehicle.updateOne( {id: req.params.vehicleId}, {reglementpap:{$pull: {uid: [req.params.papierId] }} } )

           Vehicle.findOne({_id: req.params.vehicleId}, function (error, doc) {
            if (error) {
                res.send(null, 500);
            } else if (doc) {
                var records = {'records': doc};
                // find the delete uid in the favorites array
                var idx = doc.reglementpap ? doc.reglementpap.indexOf(req.params.papierId) : -1;
                // is it valid?
                if (idx !== -1) {
                    // remove it from the array.
                    doc.reglementpap.splice(idx, 1);
                    //res.status(200);

                    // save the doc
                    doc.save(function(error) {
                        if (error) {
                            console.log(error);
                            res.send(null, 500);
                        } else {
                            // send the records
                            res.send(records);
                            res.status(200);

                        }
                    });
                    // stop here, otherwise 404
                    return;
                }
            }
            // send 404 not found
            res.send(null, 404);
        });
    };


    
     
        

    //  Vehicle.findOneAndUpdate( {Vehicle: req.params.vehicleId}, { $pull: {reglementpap: [req.params.papierId] } } )

    /*
    TemplateDoc.findOneAndUpdate(
    { userId: _id },
    { $pull: { templates: { _id: templateid } } },
    { new: true }
  )
    .then(templates => console.log(templates))
    .catch(err => console.log(err));





    */



/// servive for search papier 
//get mainetnance

exports.maintenance= (req, res) => {

    Vehicle.findById(req.params.vehicleId)
        .then(vehicle => {
            if (!vehicle) {
                return res.status(404).json({
                    message: "vehicle not found with ID" + req.params.vehicleId,
                    result: null,
                    code: 1000
                });

            }
            return res.json({
                result: vehicle.maintenance,
                code: 0,
                message: null
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with ID" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 0,
                message: "Error retrieving note with id " + req.params.vehicleId
            });
        });


};
exports.getmain= (req, res) => {

    Vehicle.findById(req.params.vehicleId)
        .then(vehicle => {
            if (!vehicle) {
                return res.status(404).json({
                    message: "vehicle not found with ID" + req.params.vehicleId,
                    result: null,
                    code: 1000
                });

            }
            return res.json({
                result: vehicle.AlerteVehicule,
                code: 0,
                message: null
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with ID" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 0,
                message: "Error retrieving note with id " + req.params.vehicleId
            });
        });


};
exports.getdiagnostic= (req, res) => {

    Vehicle.findById(req.params.vehicleId)
        .then(vehicle => {
            if (!vehicle) {
                return res.status(404).json({
                    message: "vehicle not found with ID" + req.params.vehicleId,
                    result: null,
                    code: 1000
                });

            }
            return res.json({
                result: vehicle.diagnostic,
                code: 0,
                message: null
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with ID" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 0,
                message: "Error retrieving note with id " + req.params.vehicleId
            });
        });


};


exports.papier = (req, res) => {

    Vehicle.findById(req.params.vehicleId)
        .then(vehicle => {
            if (!vehicle) {
                return res.status(404).json({
                    message: "vehicle not found with ID" + req.params.vehicleId,
                    result: null,
                    code: 1000
                });

            }
            return res.json({
                result: vehicle.reglementpap,
                code: 0,
                message: null
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with ID" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 0,
                message: "Error retrieving note with id " + req.params.vehicleId
            });
        });


};
/* simple upadate
exports.upadatePapier=(req,res)=>{
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
    
    Vehicle.findByIdAndUpdate(req.params.vehicleId, {
  
        reglementpap:req.body.jojo





    }, { new: true })
            .then(vehicleUpdated => {
                if (!vehicleUpdated) {
                    return res.status(404).json({
                        result: null,
                        code: 0,
                        message: "vehicle not found with id" + req.params.vehicleId
                    });
                }
                return res.json({
                    result: vehicleUpdated,
                    code: 0,
                    message: null
                });
            }).catch(err => {
                return res.status(500).json({
                    result: null,
                    code: 1000,
                    message: "Error updating vehicle with id " + req.params.vehicleId
                });
            });}



*/
exports.upadatePapier=(req,res)=>{
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
    
    Vehicle.findByIdAndUpdate(req.params.vehicleId, { new: true })
    .then(vehicle => {
        const newHC = vehicle.reglementpap.concat([{ ...req.body.reglementpap }]);
        console.log('newHC = ', newHC);
        Vehicle.findByIdAndUpdate(req.params.vehicleId, {
            reglementpap: newHC,
        }, { new: true })
            .then(vehicleUpdated => {
                if (!vehicleUpdated) {
                    return res.status(404).json({
                        result: null,
                        code: 0,
                        message: "vehicle not found with id" + req.params.vehicleId
                    });
                }
                return res.json({
                    result: vehicleUpdated,
                    code: 0,
                    message: null
                });
            }).catch(err => {
                return res.status(500).json({
                    result: null,
                    code: 1000,
                    message: "Error updating vehicle with id " + req.params.vehicleId
                });
            });
    }).catch(err => {

        if (err.kind === 'ObejectId') {

            return res.status(404).json({
                result: null,
                code: 0,
                message: "vehicle not found with id" + req.params.vehicleId
            });
        }
        return res.status(500).json({
            result: null,
            code: 1000,
            message: "Error updating vehicle with id " + req.params.vehicleId
        });

    });

};
//upadate maintenance

exports.upadatemaintenance=(req,res)=>{
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
    
    Vehicle.findByIdAndUpdate(req.params.vehicleId, { new: true })
    .then(vehicle => {
        const newHC = vehicle.maintenance.concat([{ ...req.body.maintenance }]);
        console.log('newHC = ', newHC);
        Vehicle.findByIdAndUpdate(req.params.vehicleId, {
            maintenance: newHC,
        }, { new: true })
            .then(vehicleUpdated => {
                if (!vehicleUpdated) {
                    return res.status(404).json({
                        result: null,
                        code: 0,
                        message: "vehicle not found with id" + req.params.vehicleId
                    });
                }
                return res.json({
                    result: vehicleUpdated,
                    code: 0,
                    message: null
                });
            }).catch(err => {
                return res.status(500).json({
                    result: null,
                    code: 1000,
                    message: "Error updating vehicle with id " + req.params.vehicleId
                });
            });
    }).catch(err => {

        if (err.kind === 'ObejectId') {

            return res.status(404).json({
                result: null,
                code: 0,
                message: "vehicle not found with id" + req.params.vehicleId
            });
        }
        return res.status(500).json({
            result: null,
            code: 1000,
            message: "Error updating vehicle with id " + req.params.vehicleId
        });

    });

};


//update cordinate 
exports.upadatecordinate=(req,res)=>{
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
    
    Vehicle.findByIdAndUpdate(req.params.vehicleId, { new: true })
    .then(vehicle => {
        const newHC = vehicle.historyCoordiantes.concat([{ ...req.body.historyCoordiantes }]);
        console.log('newHC = ', newHC);
        Vehicle.findByIdAndUpdate(req.params.vehicleId, {
            historyCoordiantes: newHC,
        }, { new: true })
            .then(vehicleUpdated => {
                if (!vehicleUpdated) {
                    return res.status(404).json({
                        result: null,
                        code: 0,
                        message: "vehicle not found with id" + req.params.vehicleId
                    });
                }
                return res.json({
                    result: vehicleUpdated,
                    code: 0,
                    message: null
                });
            }).catch(err => {
                return res.status(500).json({
                    result: null,
                    code: 1000,
                    message: "Error updating vehicle with id " + req.params.vehicleId
                });
            });
    }).catch(err => {

        if (err.kind === 'ObejectId') {

            return res.status(404).json({
                result: null,
                code: 0,
                message: "vehicle not found with id" + req.params.vehicleId
            });
        }
        return res.status(500).json({
            result: null,
            code: 1000,
            message: "Error updating vehicle with id " + req.params.vehicleId
        });

    });

};
/// get cordinate 
exports.getcord= (req, res) => {

    Vehicle.findById(req.params.vehicleId)
        .then(vehicle => {
            if (!vehicle) {
                return res.status(404).json({
                    message: "vehicle not found with ID" + req.params.vehicleId,
                    result: null,
                    code: 1000
                });

            }
            return res.json({
                result: vehicle.historyCoordiantes,
                code: 0,
                message: null
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with ID" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 0,
                message: "Error retrieving note with id " + req.params.vehicleId
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
    Vehicle.findByIdAndUpdate(req.params.vehicleId, {
        marque: req.body.marque,
        category: req.body.category,
        referenceSensor: req.body.referenceSensor,
        fuelLevel: req.body.fuelLevel,
        speed: req.body.speed,
        coordinates: req.body.coordinates,
        driver: req.body.driver,
        registration_number: req.body.registration_number




    }, { new: true })
        .then(vehicle => {
            const newHC = vehicle.historyCoordiantes.concat([{ date: new Date(), ...req.body.coordinates }]);
            console.log('newHC = ', newHC);
            Vehicle.findByIdAndUpdate(req.params.vehicleId, {
                historyCoordiantes: newHC,
            }, { new: true })
                .then(vehicleUpdated => {
                    if (!vehicleUpdated) {
                        return res.status(404).json({
                            result: null,
                            code: 0,
                            message: "vehicle not found with id" + req.params.vehicleId
                        });
                    }
                    return res.json({
                        result: vehicleUpdated,
                        code: 0,
                        message: null
                    });
                }).catch(err => {
                    return res.status(500).json({
                        result: null,
                        code: 1000,
                        message: "Error updating vehicle with id " + req.params.vehicleId
                    });
                });
        }).catch(err => {

            if (err.kind === 'ObejectId') {

                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with id" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating vehicle with id " + req.params.vehicleId
            });

        });

};
///////////////////////////////////////////////////////////
exports.updc= (req, res) => {

    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Vehicle.findByIdAndUpdate(req.params.vehicleId,{
      
        historyCoordiantes:req.body.historyCoordiantes




    }, { new: true })
        .then(vehicle => {
            const newHC = vehicle.historyCoordiantes.concat([{ ...req.body.historyCoordiantes}]);
            console.log('newHC = ', newHC);
            Vehicle.findByIdAndUpdate(req.params.vehicleId, {
                historyCoordiantes: newHC,
            }, { new: true })
                .then(vehicleUpdated => {
                    if (!vehicleUpdated) {
                        return res.status(404).json({
                            result: null,
                            code: 0,
                            message: "vehicle not found with id" + req.params.vehicleId
                        });
                    }
                    return res.json({
                        result: vehicleUpdated,
                        code: 0,
                        message: null
                    });
                }).catch(err => {
                    return res.status(500).json({
                        result: null,
                        code: 1000,
                        message: "Error updating vehicle with id " + req.params.vehicleId
                    });
                });
        }).catch(err => {

            if (err.kind === 'ObejectId') {

                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with id" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating vehicle with id " + req.params.vehicleId
            });

        });

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

    Vehicle.findByIdAndRemove(req.params.vehicleId)
        .then(vehicle => {

            if (!vehicle) {
                return res.status(404).json({
                    code: 1001,
                    message: "vehicel note found with id" + req.params.vehicleId,
                    result: null
                });
            }
            return res.status(200).json({});
        }).catch(err => {

            if (err.kind === 'ObjectId' || err.marque === 'NotFound') {
                return res.status(404).json({
                    code: 1001,
                    message: "vehicel note found with id" + req.params.vehicleId,
                    result: null
                });
            }
            return res.status(500).json({
                code: 1001,
                result: null,
                message: "Could not delete vehicle with id " + req.params.vehicleId
            });
        });
};

//parse

// let CalculateScore = async(req,res)=>{
//     try {

//         let Scooring = await Vehicle.findByIdAndUpdate(req.params.userId,
//           {   
            
        
        
//         }, { new: true })
    
//         console.log(newUser)
//         if (newUser) {
//           return res.json({
//             result: newUser,
//             code: 0,
//             message: null
//           })
//         } else {
//           return res.status(404).json({
//             result: null,
//             code: 0,
//             message: "User not found with id" + req.params.userId
//           });
//         }
    
//       } catch (err) {
//         console.log(err)
//         if (err.kind === 'ObejectId') {
    
//           return res.status(404).json({
//             result: null,
//             code: 0,
//             message: "user not found with id" + req.params.userId
//           });
//         }
//         return res.status(500).json({
//           result: null,
//           code: 1000,
//           message: "Error updating user with id " + req.params.userId
//         });
    
//       };}

/*
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }




*/


/*
module.exports = {
Statistique:Statistique

}*/
exports.depassvitesse= (req, res) => {

    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request body
    Vehicle.findByIdAndUpdate(req.params.vehicleId,{
        depassement_Vitesse:req.body.depassement_Vitesse
    }, { new: true })
        .then(vehicle => {
             vehicle.depassement_Vitesse={ ...req.body.depassement_Vitesse} 
            Vehicle.findByIdAndUpdate(req.params.vehicleId, {
              depassement_Vitesse : vehicle.depassement_Vitesse
            }, { new: true })
                .then(vehicleUpdated => {
                    if (!vehicleUpdated) {
                        return res.status(404).json({
                            result: null,
                            code: 0,
                            message: "vehicle not found with id" + req.params.vehicleId
                        });
                    }
                    return res.json({
                        result: vehicleUpdated,
                        code: 0,
                        message: null
                    });
                }).catch(err => {
                    return res.status(500).json({
                        result: null,
                        code: 1000,
                        message: "Error updating vehicle with id " + req.params.vehicleId
                    });
                });
        }).catch(err => {

            if (err.kind === 'ObejectId') {

                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with id" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating vehicle with id " + req.params.vehicleId
            });

        });

};
exports.diag= (req, res) => {

    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request body
    Vehicle.findByIdAndUpdate(req.params.vehicleId,{
        diagnostic:req.body.diagnostic
    }, { new: true })
        .then(vehicle => {
             vehicle.diagnostic={ ...req.body.diagnostic} 
            Vehicle.findByIdAndUpdate(req.params.vehicleId, {
                diagnostic : vehicle.diagnostic
            }, { new: true })
                .then(vehicleUpdated => {
                    if (!vehicleUpdated) {
                        return res.status(404).json({
                            result: null,
                            code: 0,
                            message: "vehicle not found with id" + req.params.vehicleId
                        });
                    }
                    return res.json({
                        result: vehicleUpdated,
                        code: 0,
                        message: null
                    });
                }).catch(err => {
                    return res.status(500).json({
                        result: null,
                        code: 1000,
                        message: "Error updating vehicle with id " + req.params.vehicleId
                    });
                });
        }).catch(err => {

            if (err.kind === 'ObejectId') {

                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with id" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating vehicle with id " + req.params.vehicleId
            });

        });

};
exports.plagehoraire= (req, res) => {

    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request body
    Vehicle.findByIdAndUpdate(req.params.vehicleId,{
        PlageHoraire:req.body.PlageHoraire
    }, { new: true })
        .then(vehicle => {
             vehicle.PlageHoraire={ ...req.body.PlageHoraire} 
            Vehicle.findByIdAndUpdate(req.params.vehicleId, {
                PlageHoraire : vehicle.PlageHoraire
            }, { new: true })
                .then(vehicleUpdated => {
                    if (!vehicleUpdated) {
                        return res.status(404).json({
                            result: null,
                            code: 0,
                            message: "vehicle not found with id" + req.params.vehicleId
                        });
                    }
                    return res.json({
                        result: vehicleUpdated,
                        code: 0,
                        message: null
                    });
                }).catch(err => {
                    return res.status(500).json({
                        result: null,
                        code: 1000,
                        message: "Error updating vehicle with id " + req.params.vehicleId
                    });
                });
        }).catch(err => {

            if (err.kind === 'ObejectId') {

                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with id" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating vehicle with id " + req.params.vehicleId
            });

        });

};
exports.Perimetre= (req, res) => {

    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request body
    Vehicle.findByIdAndUpdate(req.params.vehicleId,{
        Perimetre:req.body.Perimetre
    }, { new: true })
        .then(vehicle => {
             vehicle.Perimetre={ ...req.body.Perimetre} 
            Vehicle.findByIdAndUpdate(req.params.vehicleId, {
                Perimetre : vehicle.Perimetre
            }, { new: true })
                .then(vehicleUpdated => {
                    if (!vehicleUpdated) {
                        return res.status(404).json({
                            result: null,
                            code: 0,
                            message: "vehicle not found with id" + req.params.vehicleId
                        });
                    }
                    return res.json({
                        result: vehicleUpdated,
                        code: 0,
                        message: null
                    });
                }).catch(err => {
                    return res.status(500).json({
                        result: null,
                        code: 1000,
                        message: "Error updating vehicle with id " + req.params.vehicleId
                    });
                });
        }).catch(err => {

            if (err.kind === 'ObejectId') {

                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with id" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating vehicle with id " + req.params.vehicleId
            });

        });

};
exports.diagbatt= (req, res) => {

    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request body
    Vehicle.findByIdAndUpdate(req.params.vehicleId,{
        battrie:req.body.battrie
    }, { new: true })
        .then(vehicle => {
             vehicle.battrie={ ...req.body.battrie} 
            Vehicle.findByIdAndUpdate(req.params.vehicleId, {
                battrie : vehicle.battrie
            }, { new: true })
                .then(vehicleUpdated => {
                    if (!vehicleUpdated) {
                        return res.status(404).json({
                            result: null,
                            code: 0,
                            message: "vehicle not found with id" + req.params.vehicleId
                        });
                    }
                    return res.json({
                        result: vehicleUpdated,
                        code: 0,
                        message: null
                    });
                }).catch(err => {
                    return res.status(500).json({
                        result: null,
                        code: 1000,
                        message: "Error updating vehicle with id " + req.params.vehicleId
                    });
                });
        }).catch(err => {

            if (err.kind === 'ObejectId') {

                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with id" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating vehicle with id " + req.params.vehicleId
            });

        });

};


exports.diagtem= (req, res) => {

    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request body
    Vehicle.findByIdAndUpdate(req.params.vehicleId,{
        temp:req.body.temp
    }, { new: true })
        .then(vehicle => {
             vehicle.temp={ ...req.body.temp} 
            Vehicle.findByIdAndUpdate(req.params.vehicleId, {
                temp : vehicle.temp
            }, { new: true })
                .then(vehicleUpdated => {
                    if (!vehicleUpdated) {
                        return res.status(404).json({
                            result: null,
                            code: 0,
                            message: "vehicle not found with id" + req.params.vehicleId
                        });
                    }
                    return res.json({
                        result: vehicleUpdated,
                        code: 0,
                        message: null
                    });
                }).catch(err => {
                    return res.status(500).json({
                        result: null,
                        code: 1000,
                        message: "Error updating vehicle with id " + req.params.vehicleId
                    });
                });
        }).catch(err => {

            if (err.kind === 'ObejectId') {

                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with id" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating vehicle with id " + req.params.vehicleId
            });

        });

};
exports.diagfeuel= (req, res) => {

    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request body
    Vehicle.findByIdAndUpdate(req.params.vehicleId,{
        fuel:req.body.fuel
    }, { new: true })
        .then(vehicle => {
             vehicle.fuel={ ...req.body.fuel} 
            Vehicle.findByIdAndUpdate(req.params.vehicleId, {
                fuel: vehicle.fuel
            }, { new: true })
                .then(vehicleUpdated => {
                    if (!vehicleUpdated) {
                        return res.status(404).json({
                            result: null,
                            code: 0,
                            message: "vehicle not found with id" + req.params.vehicleId
                        });
                    }
                    return res.json({
                        result: vehicleUpdated,
                        code: 0,
                        message: null
                    });
                }).catch(err => {
                    return res.status(500).json({
                        result: null,
                        code: 1000,
                        message: "Error updating vehicle with id " + req.params.vehicleId
                    });
                });
        }).catch(err => {

            if (err.kind === 'ObejectId') {

                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with id" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating vehicle with id " + req.params.vehicleId
            });

        });

};







exports.alertveh= (req, res) => {

    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request body
    Vehicle.findByIdAndUpdate(req.params.vehicleId,{
        AlerteVehicule:req.body.AlerteVehicule
    }, { new: true })
        .then(vehicle => {
             vehicle.AlerteVehicule={ ...req.body.AlerteVehicule} 
            Vehicle.findByIdAndUpdate(req.params.vehicleId, {
                AlerteVehicule: vehicle.AlerteVehicule
            }, { new: true })
                .then(vehicleUpdated => {
                    if (!vehicleUpdated) {
                        return res.status(404).json({
                            result: null,
                            code: 0,
                            message: "vehicle not found with id" + req.params.vehicleId
                        });
                    }
                    return res.json({
                        result: vehicleUpdated,
                        code: 0,
                        message: null
                    });
                }).catch(err => {
                    return res.status(500).json({
                        result: null,
                        code: 1000,
                        message: "Error updating vehicle with id " + req.params.vehicleId
                    });
                });
        }).catch(err => {

            if (err.kind === 'ObejectId') {

                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with id" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating vehicle with id " + req.params.vehicleId
            });

        });

};



/////////////////
exports.vtm= (req, res) => {

    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request body
    Vehicle.findByIdAndUpdate(req.params.vehicleId,{
        alerdepvit:req.body.alerdepvit
    }, { new: true })
        .then(vehicle => {
             vehicle.alerdepvit={ ...req.body.alerdepvit} 
            Vehicle.findByIdAndUpdate(req.params.vehicleId, {
                alerdepvit : vehicle.alerdepvit
            }, { new: true })
                .then(vehicleUpdated => {
                    if (!vehicleUpdated) {
                        return res.status(404).json({
                            result: null,
                            code: 0,
                            message: "vehicle not found with id" + req.params.vehicleId
                        });
                    }
                    return res.json({
                        result: vehicleUpdated,
                        code: 0,
                        message: null
                    });
                }).catch(err => {
                    return res.status(500).json({
                        result: null,
                        code: 1000,
                        message: "Error updating vehicle with id " + req.params.vehicleId
                    });
                });
        }).catch(err => {

            if (err.kind === 'ObejectId') {

                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with id" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating vehicle with id " + req.params.vehicleId
            });

        });

};
exports.plg= (req, res) => {

    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request body
    Vehicle.findByIdAndUpdate(req.params.vehicleId,{
        alertplagehori:req.body.alertplagehori
    }, { new: true })
        .then(vehicle => {
             vehicle.alertplagehori={ ...req.body.alertplagehori} 
            Vehicle.findByIdAndUpdate(req.params.vehicleId, {
                alertplagehori : vehicle.alertplagehori
            }, { new: true })
                .then(vehicleUpdated => {
                    if (!vehicleUpdated) {
                        return res.status(404).json({
                            result: null,
                            code: 0,
                            message: "vehicle not found with id" + req.params.vehicleId
                        });
                    }
                    return res.json({
                        result: vehicleUpdated,
                        code: 0,
                        message: null
                    });
                }).catch(err => {
                    return res.status(500).json({
                        result: null,
                        code: 1000,
                        message: "Error updating vehicle with id " + req.params.vehicleId
                    });
                });
        }).catch(err => {

            if (err.kind === 'ObejectId') {

                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with id" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating vehicle with id " + req.params.vehicleId
            });

        });

};
exports.perm= (req, res) => {

    // Validate Request
    if (!req.body) {
        return res.status(400).json({
            result: null,
            code: 0,
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request body
    Vehicle.findByIdAndUpdate(req.params.vehicleId,{
        alertperimetre:req.body.alertperimetre
    }, { new: true })
        .then(vehicle => {
             vehicle.alertperimetre={ ...req.body.alertperimetre} 
            Vehicle.findByIdAndUpdate(req.params.vehicleId, {
                alertperimetre : vehicle.alertperimetre
            }, { new: true })
                .then(vehicleUpdated => {
                    if (!vehicleUpdated) {
                        return res.status(404).json({
                            result: null,
                            code: 0,
                            message: "vehicle not found with id" + req.params.vehicleId
                        });
                    }
                    return res.json({
                        result: vehicleUpdated,
                        code: 0,
                        message: null
                    });
                }).catch(err => {
                    return res.status(500).json({
                        result: null,
                        code: 1000,
                        message: "Error updating vehicle with id " + req.params.vehicleId
                    });
                });
        }).catch(err => {

            if (err.kind === 'ObejectId') {

                return res.status(404).json({
                    result: null,
                    code: 0,
                    message: "vehicle not found with id" + req.params.vehicleId
                });
            }
            return res.status(500).json({
                result: null,
                code: 1000,
                message: "Error updating vehicle with id " + req.params.vehicleId
            });

        });

};