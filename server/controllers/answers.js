// answers.js
console.log("loading the controller file - answers.js");

module.exports = (function(){
	var mongoose = require('mongoose');
	var Answer = mongoose.model('Answer');
	var Question = mongoose.model('Question');
	var path = require('path');

	function answersController(){
		this.create = function(req, res){
			console.log("post data for creating an answer", req.body);
			// inserting new answer into db
			var answer = new Answer({answer: req.body.answer, details: req.body.details, user_name: req.body.user_name});
			// var user = req.body.user;
			answer._question = req.body.question_id;
			answer.save(function(err, result){
				console.log("errors - ", err);
				console.log("result - ", result);
				if(err){
					console.log('something went wrong while saving a new answer data', err);
					res.json(err);
				} else {
					console.log("successfully added a new answer!", result);
						Question.findOne({_id: result._question}, function(err, question){
							console.log("errors - ", err);
							console.log("result - ", question);
							if(err){
								console.log('something went wrong while getting a question data for show page', err);
								// res.json(err);
							} else {
								console.log("successfully got a question data for show page!", question);
								// res.render('show', {title: "User Show - First Mongoose App", user: user});
								question._answers.push(result);
								question.save(function(err, question){
								console.log("errors - ", err);
								console.log("result - ", question);
									if(err){
										console.log('something went wrong while saving a question data after updating', err);
										// res.json(err);
									} else {
										console.log("successfully updated a question!", question);
										// res.json(question);
									}
								});
							}
						});
					res.json(result);
				}
			});
		};
		
		this.update = function(req, res){
			console.log("updating data ", req.body);
			// updating likes of an answer into db
			Answer.findOne({_id: req.params.id}, function(err, answer){
				console.log("errors - ", err);
				console.log("result - ", answer);
				if(err){
					console.log('something went wrong while getting a answer data for updating', err);
				} else {
					console.log("successfully got a answer data for updating!");
					answer.likes ++;
					answer.updatedAt = new Date();
					answer.save(function(err, result){
						console.log("errors - ", err);
						console.log("result - ", result);
						if(err){
							console.log('something went wrong while saving a answer data after updating', err);
							res.json(err);
						} else {
							console.log("successfully updated a answer!", result);
							res.json(result)
						}
					});
				}
			});
		};
	}
	return new answersController();
})();