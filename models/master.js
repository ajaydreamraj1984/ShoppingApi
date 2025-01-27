const mongoose = require('mongoose');


//Define the categories schema
const categoriesSchema = new mongoose.Schema({ 
    cat_name: { type: String, unique: true, require: [true, 'category name is required'] },
    cat_desc: { type: String, maxlength: [500, 'description cannot exceed 500 characters'] },
	cat_img: { type: String},
    status: { type: Boolean, default: true }
})
const categories = mongoose.model('categories', categoriesSchema); 


//Define the sub-categories schema
const subcategoriesSchema = new mongoose.Schema({ 
	cat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: [true, 'Category ID is required']},
    sub_cat_name: { type: String, require: [true, 'sub category name is required'] }, 
    sub_cat_desc: { type: String, require: true, maxlength: [500, 'description cannot exceed 500 characters'] }, 
	sub_cat_img: { type: String},
    active: { type: Boolean, default: true},
    doe: { type: Date, default: Date.now() }
})
const subcategories = mongoose.model('subcategories', subcategoriesSchema);  



//Define the color schema
const colorsSchema = new mongoose.Schema({ 
    name: { type: String, require: true, unique: true },
    color_code: { type: String },
    status: { type: Boolean, default: true }
})
const colors = mongoose.model('colors', colorsSchema);



//Define the categories schema
const sizesSchema = new mongoose.Schema({ 
    size: { type: String, require: true, unique: true },
    dimensions: { type: String },
    status: { type: Boolean, default: true }
})
const sizes = mongoose.model('sizes', sizesSchema);



//Define the variants schema
const variantsSchema = new mongoose.Schema({ 
    size: { type: mongoose.Schema.Types.ObjectId, ref: 'sizes'}, 
    color: { type: mongoose.Schema.Types.ObjectId, ref: 'colors'},  
    mrp: { type: Number, required: true, default: 0 },
    dp_price: { type: Number, required: true, default: 0 },
    status: { type: Boolean, default: true }
})
const variants = mongoose.model('variants', variantsSchema);


module.exports = {categories, subcategories, sizes, colors, variants };


