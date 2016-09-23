// routes.js
console.log("loading the routes file - routes.js");
// var friends = require('./../controllers/friends.js');
var users = require('./../controllers/users.js');
var answers = require('./../controllers/answers.js');
var questions = require('./../controllers/questions.js');

module.exports = function(app){
	
	// users routes
	app.post('/users', users.create);

	// questions routes
	app.get('/questions', questions.index);
	app.post('/questions', questions.create);
	app.get('/questions/:id', questions.show);
	
	// answers routes
	app.post('/answers', answers.create);
	app.put('/answers/:id', answers.update);
}