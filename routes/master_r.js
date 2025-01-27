const express = require('express');
const router = express.Router();
const masterController = require('../controllers/master_c');
const adminAuth  =require("../middleware/adminAuth"); 
 

//router.get('/get-category', masterController.add_category);
//router.get('/add-category', adminAuth, masterController.getUserById);

// router.get('/get-subcategory', masterController.getAllUsers);
// router.get('/add-subcategory', adminAuth, masterController.getUserById);

// router.get('/get-size',  masterController.getAllUsers);
// router.get('/add-size', adminAuth, masterController.getUserById);

// router.get('/get-color',  masterController.getAllUsers);
// router.get('/add-color', adminAuth, masterController.getUserById);


module.exports = router;  