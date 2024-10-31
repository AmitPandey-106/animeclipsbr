const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: String,
    password: String,
    //Full_name: String,
});

const ADMIN = mongoose.model('Admin', adminSchema);
module.exports = ADMIN