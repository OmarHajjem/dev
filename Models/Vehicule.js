var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let VehicleSchema = new Schema({
    id: {
        type: String
    },
    admin:{
        type:String,
        required: true},
    Perimetre:{
    rayon:{
        type:Number,
        trim: true,
        required: false
    },
    lat:{
        type:Number,
        trim :true ,
        required :false
    },
    lin:{
        type:Number,
        trim :true ,
        required :false
    },
        Mailedalerte: { type: String,
            trim: true,
             required: false
    
            }
},
    AlerteVehicule:{
        Alerdeplacement: { type: Number,
            trim: true,
             required: false
    
            },
            Alertnivcarb: { type: Number,
                trim: true,
                 required: false
        
                },
                alertetatbatr:{
                    type: Number,
                trim: true,
                 required: false

                },
                alertemaint:{
                    type: Number,
                trim: true,
                 required: false

                },
                alerteverVeh:{
                    type: Number,
                trim: true,
                 required: false

                },
                alertefeuveh:{
                    type: Number,
                trim: true,
                 required: false

                },
                alertechoc:{
                    type: Number,
                trim: true,
                 required: false

                },
                Mailedalerte: { type: String,
                    trim: true,
                     required: false
            
                    }
       

    },
    
    depassement_Vitesse:  {
        vitesse_max: { type: Number,
       trim: true,
        required: false

       },
       Mailedalerte: { type: String,
           trim: true,
            required: false
   
           },
       Commentaire: { type: String,
               trim: true,
                required: false
       
               }
   },
   PlageHoraire:{
    hdb:{
        type:String,
        trim: true,
        required: false
    },
    Hdf:{
        type:String,
        trim :true ,
        required :false
    },
    Mailedalerte: { type: String,
        trim: true,
         required: false

        }
},
Perimetre:{
    rayon:{
        type:Number,
        trim: true,
        required: false
    },
    lat:{
        type:Number,
        trim :true ,
        required :false
    },
    lin:{
        type:Number,
        trim :true ,
        required :false
    },
        Mailedalerte: { type: String,
            trim: true,
             required: false
    
            }
},
    AlerteRoute:{
        depassement_Vitesse:  {
            vitesse_max: { type: Number,
           trim: true,
            required: false
   
           },
           Mailedalerte: { type: String,
               trim: true,
                required: false
       
               },
           Commentaire: { type: String,
                   trim: true,
                    required: false
           
                   }
       },
       PlageHoraire:{
           hdb:{
               type:Date,
               trim: true,
               required: false
           },
           Hdf:{
               type:Date,
               trim :true ,
               required :false
           },
           Mailedalerte: { type: String,
               trim: true,
                required: false
       
               }
       },
       

    },
    battrie:{
        min:{
            type:Number,
            trim: true,
            required: false
        },
        Commentaire:{
            type:String,
            trim :true ,
            required :false
        }
    },
    temp:{
        max:{
            type:Number,
            trim: true,
            required: false
        },
        Commentaire:{
            type:String,
            trim :true ,
            required :false
        }
    },
    fuel:{
        min:{
            type:Number,
            trim: true,
            required: false
        },
        Commentaire:{
            type:String,
            trim :true ,
            required :false
        }
    },
    
  
 maintenance:  [
        {

      
        Categorie: {
                type: String,
                trim: true,
                 required: false
            },
        kilometrage: {
                type: Number,
                trim: true,
                required: false
            },
          Date: {
            type: Date,
            trim: true,
            required: false,
            },
            Commentaire:{
                type:String,
                defaultsTo:"jojo",
                

                required: true,
                


            }}
        
    ],
   
    marque: {
        type: String,
        trim: true,
        default: null,
        required: true
    },
    category: {
        type: String,
        trim: true,
        default: null,
        required: false
    },
    historyCoordiantes: [
        {

        date: {
                type: Date,
                trim: true,
                default:Date.now(),
                 required: false
            },
        lon: {
                type: Number,
                trim: true,
                default: null,
                required: true
            },
         lat: {
                type: Number,
                trim: true,
                default: null,
                required: true
            }
        }
    ],
    referenceSensor: {

        type: String,
        trim: true,
        default: null,
        required: true
    },
    coordinates: {

        lat: Number,
        lng: Number,
        required: false
    },
    diagnostic:{
        codedef:{
            type:Number,
            trim: true,
            required: false
        },
        battrielevel:{
            type:Number,
            trim :true ,
            required :false
        },
        temperature:{
            type:Number,
            trim :true ,
            required :false
        },
        fuel: { type: Number,
                trim: true,
                 required: false
        
                }
    },
    
    driver: {
        type: String,
        trim: true,
        default: null,
        required: true
    },
    registration_number: {

        type: String,
        trim: true,
        default: null,
        required: true
    }, 
    
    // reglementpap:  [
      //  pap
   // ]
   reglementpap:  [
        {

      
        Categorie: {
                type: String,
                trim: true,
                 required: false
            },
          Date: {
                type: Date,
                trim: true,
                default: null,
                required: false,
                
            }}
        
    ],
    alerdepvit: {
        type: {type:String,
            default: "null",
        },
        date:{ type:Date,
            },
        Vitesse:{type:Number}

    },
    alertplagehori: {
        type: {type:String,
            default: "null",
            },
        date:{ type:Date,
       // default:Date.now(),

            }
    },
    alertperimetre:{
        type: {type:String,
            default: "null",
           },
        date:{ type:Date,
            }
    },
    alertmaintenance:{
        type: {type:String},
        date:{ type:Date}
    },
    alertdeplacement:{
        type: {type:String},
        date:{ type:Date}
    },
    alertnivcarburant:{
        type: {type:String},
        date:{ type:Date}
    }





});
module.exports = mongoose.model('Vehicle', VehicleSchema);

