require('dotenv').config();  
const {categories, subcategories, sizes, colors, variants} = require('../models/master'); 
 
//Add category
exports.add_category = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        res.status(200).json(data);
    }
    catch (err) {
        console.log("error", err);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
};



// // Add a Size Route
// router.post('/add_sizes', async (req, res) => {
//     try { 
//         const data = req.body; 
//         data.size_id=await getNextSequence("size_id"); 
//         const new_sizes = new sizes(data);
//         const response = await new_sizes.save(); 
//         res.status(200).json(response);
//     }
//     catch (err) {
//         console.log("error", err);
//         res.status(500).json({ error: 'Internal Server Error.' });
//     }
// })


// // Add a colors Route
// router.post('/add_colors', async (req, res) => {
//     try { 
//         const data = req.body; 
//         data.color_id=await getNextSequence("color_id"); 
//         const new_colors = new colors(data);
//         const response = await new_colors.save(); 
//         res.status(200).json(response);
//     }
//     catch (err) {
//         console.log("error", err);
//         res.status(500).json({ error: 'Internal Server Error.' });
//     }
// })

//module.exports = router;

