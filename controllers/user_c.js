require('dotenv').config();
const user = require('../models/user');
//const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/jwt');
require('dotenv').config();

//const axios = require("axios");

//Add user
exports.signupUser = async (req, res) => {
    try {
        const data = req.body;
        console.log(data); 
        const { userid } = req.body;
        const users = await user.findOne({ userid: userid }); 
        if (users) {
            return res.status(422).json({
                result: false,
                tokenvalid: false,
                token: '',
                data: '',
                message: 'User already exists.!!'
            });
        }
 

        const new_user = new user(data);
        const response = await new_user.save();
        // generate Token 
        const payload = {
            uid: response.uid,
            userid: response.userid,
            name: response.name,
            mobile: response.mobile
        } 
        //Generate Token  tokenvalid: true,
        const token = await generateToken(payload);
        res.status(200).json({
            result: true, 
            token: token,
            data: { payload },
            message: 'User updated successfully'
        }); 
    }
    catch (err) {
        console.log("error", err);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
};

 

// Login user
exports.loginUser = async (req, res) => {
    try{
        // Extract user_id and password from request body
        const {userid, password} = req.body;

        // Find the user by user_id
        const user = await users.findOne({userid: userid});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        const payload = {
            uid: response.uid,
            userid: response.userid,
            name: response.name,
            mobile: response.mobile
        } 
        //Generate Token  tokenvalid: true,
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

 

// Get user by ID
exports.getUserById = async (req, res) => {
    // Ensure the param is named 'id' in the route
    const user = req.user;

    const { id = user.UId } = req.params;
    console.log("this is my UId  fron token ", req.params);


    try {
        const poolConnection = await pool;
        const result = await poolConnection.request()
            .input('UId', sql.Int, id)  // Use 'id' from req.params

            .execute("GetUserDetail");

        if (result.recordset.length === 0) {
            return res.status(200).json({ result: false, data: '', message: 'User not found' });
        }

        const userresult = result.recordset[0];
        delete userresult.password;
        res.status(200).json({ result: true, data: userresult, message: 'User fetched successfully' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(200).json({ result: false, data: '', message: 'Database error' });
    }
};


//........................UPDATE PROFILEPIC USER  SIDE ..........................
exports.updateProfile = async (req, res) => {

};



