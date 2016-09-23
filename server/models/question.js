// question.js scheema
console.log("loading the model file - question.js");

var mongoose = require('mongoose');
var questionSchema = new mongoose.Schema({
	question: {type: String, required: [true, "Question cannot be empty!"], minlength: [10, "Question cannot be less than 10 characters!"]},
	description: {type: String},
	_answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}]
},{timestemp: true});
// setter
mongoose.model('Question', questionSchema);
