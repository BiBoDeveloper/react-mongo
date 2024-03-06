const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
    name: String,
    email: String,
    rollno: Number
});


module.exports = mongoose.model('Student', studentSchema);