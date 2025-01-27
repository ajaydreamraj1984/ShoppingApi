const mongoose = require('mongoose');
require('dotenv').config(); 
async function connect_db() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB Server');
  } catch (error) {
    console.error('Connection error:', error);
  }
} 
connect_db();
 
//module.exports = connect_db;