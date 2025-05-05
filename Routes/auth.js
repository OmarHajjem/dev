const express = require("express");
const router = express.Router({ mergeParams: true });
const authService = require("../Services/auth");

/* User Registration. */
router.post("/register", authService.register);
router.post("/registeradmin", authService.registerAdmin);

router.get("/Admins",authService.findAlladmins);



/* User Login. */
router.post("/login", authService.login);
router.post("/loginadmin", authService.loginadmin);


/*User findAll. */
router.get("/Users",authService.findAllUsers);
 
/*User finbyId*/
router.get('/Users/:userId',authService.findUserById);
router.get('/admin/:adminid',authService.findadminById); 

// // Update a user with userId
router.put('/Users/:userId', authService.UpdateUser);
router.put('/adminlic/:adminid', authService.Updatadmin);

// // Update Status a user with userId
router.get('/User/:userId/:status', authService.UpdateStatusUser);

// // Update StatusEnabled a user with userId

//router.get('/User/:userId',authService)

// Delete a user with userId
router.delete('/Users/:userId', authService.deleteUser);
router.delete('/deleteadmin/:userId', authService.deleteadmin);



module.exports = router;