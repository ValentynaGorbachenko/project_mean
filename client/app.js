// app.js
console.log("loading app");
var app = angular.module('app', ['ngRoute']);

(function(){
	app.config(function($routeProvider){
		$routeProvider
		.when('/index', {
			templateUrl: 'partials/login.html',
			controller: 'LoginController'
		})
		.when('/',{
			templateUrl: 'partials/questions.html',
			controller: 'QestionsController'
		})
		.when('/new_question', {
			templateUrl: 'partials/new_question.html',
			controller: 'NewQuestionController'
		})
		.when('/questions/:id/new_answer', {
			templateUrl: 'partials/new_answer.html',
			controller: 'NewAnswerController'
		})
		.when('/questions/:id', {
			templateUrl: 'partials/show.html',
			controller: 'ShowQuestionController'
		})
		
		.otherwise({
			redirectTo: '/'
		});
	});
})();