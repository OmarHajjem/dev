//const async = require("async");
const config = require("../Utilities/config").config;
const UserDAO = require('../DAO/userDAO');
const MD5 = require('md5');
const jwt = require('jsonwebtoken');
const User = require("../Models/User");
const Admindao=require("../DAO/Admin")
const Admin=require("../Models/Utilisateur")
let registerAdmin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({ message: 'Parameters are missing' })
  } else {
    try {
      let criteria = {
        email: req.body.email
      }
      const checkEmail = await Admindao.getadmins(criteria);
      if (checkEmail && checkEmail.length == 1) {
        res.status(401).json({ message: 'email already registered' })
      } else {
        let userData = {
          
          firstName: req.body.firstName ? req.body.firstName : "",
          lastName: req.body.lastName ? req.body.lastName : "",
          email: req.body.email,
          phone: req.body.phone,
          password: MD5(MD5(req.body.password)),
          status: true
        };
        const addUser = await Admindao.createadmin(userData);
        // console
        if (addUser) {
          res.status(200).json({ message: 'Admin registered successfully!' })
        } else {
          res.status(403).json({ message: "Something went wrong" });
        }
      }
    } catch (error) {
      res.status(404).json({ message: "Something went wrong", error: error });
    }
  }
};


/* API to register new user */
let register = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({ message: 'Parameters are missing' })
  } else {
    try {
      let criteria = {
        email: req.body.email
      }
      const checkEmail = await UserDAO.getUsers(criteria);
      if (checkEmail && checkEmail.length == 1) {
        res.status(401).json({ message: 'email already registered' })
      } else {
        let userData = {
          firstName: req.body.firstName ? req.body.firstName : "",
          lastName: req.body.lastName ? req.body.lastName : "",
          email: req.body.email,
          phone: req.body.phone,
          password: MD5(MD5(req.body.password)),
          status: true,
          admin:req.body.admin
        };
        const addUser = await UserDAO.createUser(userData);
        // console
        if (addUser) {
          res.status(200).json({ message: 'User registered successfully!' })
        } else {
          res.status(403).json({ message: "Something went wrong" });
        }
      }
    } catch (error) {
      res.status(404).json({ message: "Something went wrong", error: error });
    }
  }
};

/* api to login admin*/
let loginadmin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({ message: 'Parameters are missing' });
  } else {
    try {
      let criteria = {
        email: req.body.email,
        status: true
        //status : req.body.status,

      };
      let criteriaa = {

        status: false
      };

      const checkStatus = await Admindao.getadmins(criteriaa);



      const checkEmail = await Admindao.getadmins(criteria);
      if (checkEmail && checkEmail.length > 0) {
        let criteria = {
          email: req.body.email,
          password: MD5(MD5(req.body.password))
        };
        const checkPassword = await Admindao.getadmins(criteria);
        if (checkPassword && checkPassword.length == 1) {
          res.status(200).json({
            message: 'Logged in successfully!'
            , result: checkPassword[0], token: 'dummy-jwt-token-for-now1'
          });
        } else {
          res.status(401).json({ message: 'Incorrect password' });
        }
      } else {
        res.status(401).json({ message: 'Email not exist!' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Something went wrong', error: error });
    }
  }
};
/* API to login user */
let login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({ message: 'Parameters are missing' });
  } else {
    try {
      let criteria = {
        email: req.body.email,
        status: true
        //status : req.body.status,

      };
      let criteriaa = {

        status: false
      };

      const checkStatus = await UserDAO.getUsers(criteriaa);



      const checkEmail = await UserDAO.getUsers(criteria);
      if (checkEmail && checkEmail.length > 0) {
        let criteria = {
          email: req.body.email,
          password: MD5(MD5(req.body.password))
        };
        const checkPassword = await UserDAO.getUsers(criteria);
        if (checkPassword && checkPassword.length == 1) {
          res.status(200).json({
            message: 'Logged in successfully!'
            , result: checkPassword[0], token: 'dummy-jwt-token-for-now'
          });
        } else {
          res.status(401).json({ message: 'Incorrect password' });
        }
      } else {
        res.status(401).json({ message: 'Email not exist!' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Something went wrong', error: error });
    }
  }
};
////getUsers
let findAllUsers = async (req, res) => {

  User.find()
    .then(users => {
      return res.status(200).json({ result: users, code: 0, message: null });
    }).catch(err => {
      return res.status(500).send({
        result: null,
        code: 1000,
        message: err.message || "Some error occurred while retrieving notes."
      });
    });


};
let findAlladmins = async (req, res) => {

  Admin.find()
    .then(Admins => {
      return res.status(200).json({ result: Admins, code: 0, message: null });
    }).catch(err => {
      return res.status(500).send({
        result: null,
        code: 1000,
        message: err.message || "Some error occurred while retrieving notes."
      });
    });


};
////findUserById
let findUserById = async (req, res) => {


  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "user not found with ID" + req.params.userId,
          result: null,
          code: 1000
        });

      }
      return res.json({
        result: user,
        code: 0,
        message: null
      });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          result: null,
          code: 0,
          message: "user not found with ID" + req.params.userId
        });
      }
      return res.status(500).json({
        result: null,
        code: 0,
        message: "Error retrieving note with id " + req.params.userId
      });
    });





};
//
let Updatadmin = async (req, res) => {

  // Validate Request
  if (!req.body) {
    return res.status(400).json({
      result: null,
      code: 0,
      message: "Note content can not be empty"
    });
  }

  // Find note and update it with the request body
  Admin.findByIdAndUpdate(req.params.adminid, {
    Licence: req.body.Licence,

  }, { new: true })
    .then(Admin => {

      if (!Admin) {
        return res.status(404).json({
          result: null,
          code: 0,
          message: "User not found with id" + req.params.adminid
        });
      }
      return res.json({
        result: Admin,
        code: 0,
        message: null
      });

    }).catch(err => {

      if (err.kind === 'ObejectId') {

        return res.status(404).json({
          result: null,
          code: 0,
          message: "user not found with id" + req.params.adminid
        });
      }
      return res.status(500).json({
        result: null,
        code: 1000,
        message: "Error updating user with id " + req.params.adminid
      });

    });





};
//

let findadminById = async (req, res) => {


  Admin.findById(req.params.adminid)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "user not found with ID" + req.params.adminid,
          result: null,
          code: 1000
        });

      }
      return res.json({
        result: user,
        code: 0,
        message: null
      });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          result: null,
          code: 0,
          message: "user not found with ID" + req.params.adminid
        });
      }
      return res.status(500).json({
        result: null,
        code: 0,
        message: "Error retrieving note with id " + req.params.adminid
      });
    });





};


/////status false
let UpdateStatusUser = async (req, res) => {

  try {

    let newUser = await User.findByIdAndUpdate(req.params.userId,
      { $set: { status: req.params.status } }, { new: true })

    console.log(newUser)
    if (newUser) {
      return res.json({
        result: newUser,
        code: 0,
        message: null
      })
    } else {
      return res.status(404).json({
        result: null,
        code: 0,
        message: "User not found with id" + req.params.userId
      });
    }

  } catch (err) {
    console.log(err)
    if (err.kind === 'ObejectId') {

      return res.status(404).json({
        result: null,
        code: 0,
        message: "user not found with id" + req.params.userId
      });
    }
    return res.status(500).json({
      result: null,
      code: 1000,
      message: "Error updating user with id " + req.params.userId
    });

  };

}
////status true
let StatusDisabled = async (req, res) => {


};




////UpdateUser
let UpdateUser = async (req, res) => {

  // Validate Request
  if (!req.body) {
    return res.status(400).json({
      result: null,
      code: 0,
      message: "Note content can not be empty"
    });
  }

  // Find note and update it with the request body
  User.findByIdAndUpdate(req.params.userId, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password




  }, { new: true })
    .then(user => {

      if (!user) {
        return res.status(404).json({
          result: null,
          code: 0,
          message: "User not found with id" + req.params.userId
        });
      }
      return res.json({
        result: user,
        code: 0,
        message: null
      });

    }).catch(err => {

      if (err.kind === 'ObejectId') {

        return res.status(404).json({
          result: null,
          code: 0,
          message: "user not found with id" + req.params.userId
        });
      }
      return res.status(500).json({
        result: null,
        code: 1000,
        message: "Error updating user with id " + req.params.userId
      });

    });





};



////deleteUser
let deleteUser = async (req, res) => {

  User.findByIdAndRemove(req.params.userId)
    .then(user => {

      if (!user) {
        return res.status(404).json({
          code: 1001,
          message: "user note found with id" + req.params.userId,
          result: null
        });
      }
      return res.status(200).json({});
    }).catch(err => {

      if (err.kind === 'ObjectId' || err.marque === 'NotFound') {
        return res.status(404).json({
          code: 1001,
          message: "user note found with id" + req.params.userId,
          result: null
        });
      }
      return res.status(500).json({
        code: 1001,
        result: null,
        message: "Could not delete user with id " + req.params.userId
      });
    });


};


let deleteadmin= async (req, res) => {

  Admin.findByIdAndRemove(req.params.userId)
    .then(Admin => {

      if (!Admin) {
        return res.status(404).json({
          code: 1001,
          message: "user note found with id" + req.params.userId,
          result: null
        });
      }
      return res.status(200).json({});
    }).catch(err => {

      if (err.kind === 'ObjectId' || err.marque === 'NotFound') {
        return res.status(404).json({
          code: 1001,
          message: "user note found with id" + req.params.userId,
          result: null
        });
      }
      return res.status(500).json({
        code: 1001,
        result: null,
        message: "Could not delete user with id " + req.params.userId
      });
    });


};
//



//verify Toke

function verifyToken(req, res, next) {
  let payload;

  if (req.query.token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  try { payload = jwt.verify(req.query.token, process.env.token_Key); } catch (e) {
    return res.status(400).send('Invalid User');
  }
  if (!payload) {
    return res.status(401).send('Unauthorized request');
  }

  decoded = jwt.decode(req.query.token, { complete: true });
  req.userId = decoded.payload.id;

  next()
}




module.exports = {
  register: register,
  login: login,
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  UpdateUser: UpdateUser,
  deleteUser: deleteUser,
  UpdateStatusUser: UpdateStatusUser,
  registerAdmin:registerAdmin,
  findAlladmins:findAlladmins,
  loginadmin:loginadmin,
  deleteadmin:deleteadmin,
  findadminById:findadminById,
  Updatadmin:Updatadmin
}