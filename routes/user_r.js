const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_c');
const auth  =require("../middleware/userAuth");
 

//router.get('/getAll', userController.getAllUsers);
router.get('/get',auth, userController.getUserById);
 
//..............NWE ROUTE FOR IMG 
//router.post('/updateProfile', auth, upload.single('user_img'), userController.updateProfile);

router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);



module.exports = router;  