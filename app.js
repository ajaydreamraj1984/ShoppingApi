const express = require('express'); 
///////////////
const master_r = require('./routes/master_r'); 
const user_r = require('./routes/user_r');
const category_r = require('./routes/category_r'); 

const db=require('./config/db');  
const path = require('path');
const cors = require("cors");
const app = express();
 
// Apply CORS middleware
app.use(cors());  
app.use(express.json());


const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
require('dotenv').config();



// Use the user routers
app.use('/master', master_r); 

// Use the user routers
app.use('/user', user_r);
 

// Use the user routers
app.use('/category', category_r); 

app.get("/",(req,res)=>{ res.send("welcome to home page.....") });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
