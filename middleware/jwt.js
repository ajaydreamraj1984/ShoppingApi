const jwt = require('jsonwebtoken'); 
// Function to generate JWT token
const generateToken = (userData) => { 
    return jwt.sign(userData, process.env.SECRET_KEY, {expiresIn: '7d'});
}
module.exports = {generateToken};
 