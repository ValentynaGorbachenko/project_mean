// user.js scheema
console.log("loading the model file - user.js");

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {type: String, required:[true, "Name cannot be empty!"], minlength:[ 2, "Name cannot be sorter than 2 characters!"], unique: true }
}, {timestamps: true});
// setter
mongoose.model('User', UserSchema);

