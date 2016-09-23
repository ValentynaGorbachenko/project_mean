// answer.js scheema
console.log("loading the model file - answer.js");

var mongoose = require('mongoose');
var answerSchema = new mongoose.Schema({
 	answer: {type: String, required: [true, "Answer cannot be empty!"], minlength: [5, "Answer cannot be less than 5 characters!"]},
 	details: {type: String},
 	user_name: {type: String},
 	_question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
 	likes: {type: Number, default: 0}
 }, {timestemp:true});
// setter
mongoose.model('Answer', answerSchema);
