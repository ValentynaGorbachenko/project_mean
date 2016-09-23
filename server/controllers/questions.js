// questions.js
console.log("loading the controller file - questions.js");

module.exports = (function(){
	var mongoose = require('mongoose');
	var Question = mongoose.model('Question');
	var path = require('path');

	function questionsController(){
		this.index = function(req, res){
			Question.find({}).populate('_answers').exec(function(err, questions){
				console.log("errors - ", err);
				console.log("result - ", questions);
				if(err){
					console.log('something went wrong while getting all questions data', err);
					res.json(err);
				} else {
					console.log("successfully got all questions!", questions);
					res.json(questions);
				}
			});
		};
		this.create = function(req, res){
			console.log("post data", req.body);
			// inserting new question into db
			var question = new Question({question: req.body.question, description: req.body.description});
			question.save(function(err, result){
				console.log("errors - ", err);
				console.log("result - ", result);
				if(err){
					console.log('something went wrong while saving a new question data', err);
					res.json(err);
				} else {
					console.log("successfully added a new question!", result);
					res.json(result);
				}
			});
		};
		this.show = function(req, res){
			// finding one friend
			Question.findOne({_id: req.params.id}).populate('_answers').exec(function(err, question){
				console.log("errors - ", err);
				console.log("result - ", question);
				if(err){
					console.log('something went wrong while getting a question data for show page', err);
					res.json(err);
				} else {
					console.log("successfully got a question data for show page!", question);
					// res.render('show', {title: "User Show - First Mongoose App", user: user});
					res.json(question);
				}
			});
		};
	}
	return new questionsController();
})();