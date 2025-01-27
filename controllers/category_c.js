const { categories } = require('../models/master');

//Get category
exports.getList = async (req, res) => {
    try {
        const { cat_name, status } = req.body; 
        let query = {};
        if (status) query.status = status;
        if (cat_name) query.cat_name = cat_name; 
        console.log('query', query);
        
        const data = await categories.find(query,
            { _id: 1, cat_name: 1, cat_desc: 1, cat_img: 1, status: 1 }
        );
        res.status(200).json({ result: true, tokenvalid: true, data, message: 'Fetch category list.!!' });
    }
    catch (err) {
        console.log("error", err);
        res.status(500).json({ result: false, tokenvalid: true, data: {}, message: 'Internal Server Error.' });
    }
};



//Add category
exports.add = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const { cat_name } = data;
        const IsExists = await categories.findOne({ cat_name: { $regex: new RegExp(cat_name, 'i') } });
        if (IsExists) { return res.status(422).json({ result: false, tokenvalid: true, data: '', message: 'Category already exists.!!' }); }

        const new_categories = new categories(data);
        const db_resp = await new_categories.save();
        res.status(200).json({ result: true, tokenvalid: true, data: db_resp._id, message: 'Category save successfully' });
    }
    catch (err) {
        console.log("error", err);
        res.status(500).json({ result: false, tokenvalid: true, data: {}, message: 'Internal Server Error.' });
    }
};



// Update category
exports.Update = async (req, res) => {
    try {
        const data = req.body;
        console.log('data', data);
        const _id = req.params._id;
        console.log('_id', _id);
        if (!_id) { return res.status(400).json({ result: false, tokenvalid: true, data: {}, message: 'Category ID is required.' }); }

        const IsExists = await categories.findOne({ _id: { $nin: _id }, cat_name: { $eq: req.body.cat_name } });
        if (IsExists) { return res.status(404).json({ result: false, tokenvalid: true, data: {}, message: 'Category name already exists.' }); }

        // Update the category document
        const updateData = { cat_name: req.body.cat_name, cat_desc: req.body.cat_desc, cat_img: req.body.cat_img };
        const db_resp = await categories.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
        if (!db_resp) {  return res.status(404).json({ result: false, tokenvalid: true, data: {}, message: 'Category not found.' }); }

        return res.status(200).json({ result: true, tokenvalid: true, data: db_resp._id, message: 'Category updated successfully.' });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ result: false, tokenvalid: true, data: {}, message: 'Internal Server Error.' });
    }
};


//Status Update category
exports.StatusUpdate = async (req, res) => {
    try {
        const _id = req.params._id;
        console.log('_id', _id);
        if (!_id) { return res.status(400).json({ result: false, tokenvalid: true, data: {}, message: 'Category ID is required.' }); }

        const db_resp = await categories.findByIdAndUpdate(_id,
            { $set: { status: req.body.status } }, { new: true, runValidators: true }
        );

        if (!db_resp) { res.status(500).json({ result: false, tokenvalid: true, data: {}, message: 'Category not found.' }); }

        res.status(200).json({ result: true, tokenvalid: true, data: db_resp._id, message: 'Category updated successfully' });
    }
    catch (err) {
        console.log("error", err);
        res.status(500).json({ result: false, tokenvalid: true, data: {}, message: 'Internal Server Error.' });
    }
};
