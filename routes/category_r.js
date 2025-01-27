const express = require('express'); 
const router = express.Router();

const category_c = require('../controllers/category_c');
//const adminAuth  =require("../middleware/adminAuth"); 

router.get('/get', category_c.getList);
router.post('/add', category_c.add);
router.put('/Update/:_id', category_c.Update);
router.put('/StatusUpdate/:_id', category_c.StatusUpdate);

module.exports = router;  