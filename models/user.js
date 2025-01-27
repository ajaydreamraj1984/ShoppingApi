const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define the users schema
const userSchema = new mongoose.Schema({ 
	uid: { type: mongoose.Schema.Types.ObjectId, required: true, default: () => new mongoose.Types.ObjectId()  },
    userid: { type: String, require: true, unique: true  },
    name: { type: String, require: true, lowercase: true, trim: true, minlenth: [3, "Minimum length is 3."] },
	mobile: { type: String, require: true},
    email_id: { type: String },
    password: { type: String, require: true },
    address: { type: String, maxlength: [500, 'address cannot exceed 500 characters'] },
    state: { type: String },
    city: { type: String },
    role: { type: String, enum: ["admin", "franchise", "associate"], default: "associate" },
    sub_role: { type: String, enum: ["user", "member"], default: "user" },
    active: { type: Number, default: 1 },
    doe: { type: Date, default: Date.now() } 
},{ _id: false })



userSchema.pre('save', async function (next) {
    const users = this;
    // Hash the password only if it has been modified (or is new)
    if (!users.isModified('password')) return next();
    try {
        // hash password generation
        const salt = await bcrypt.genSalt(10);
        // hash password
        const hashedPassword = await bcrypt.hash(users.password, salt);
        // Override the plain password with the hashed one
        users.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
})


userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}
module.exports = mongoose.model('users', userSchema);
