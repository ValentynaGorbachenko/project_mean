// controllers.js
console.log("loading controllers");
// LoginController
app.controller('LoginController', ['$scope', 'userFactory', '$location', function($scope, userFactory, $location){
	$scope.log_user = {};
	$scope.errors = '';
	
	$scope.createUser = function(new_user){
		console.log("before adding new_user ", new_user);
		userFactory.create(new_user, function(data){
			console.log("data recieved from factory from server ", data);
			// if errors?
			if (data.errors){
				// supposendly errors - on html loop through arrayt to display??
				if (data.errors){
					$scope.errors = data.errors.name.message;
				// } else if ( data.errmsg){
				// 	$scope.errors = "Than name has been taken, please choose another one";
				// }
				}
			} 

			else {
				// save user name and relocate

				// to stay on the same controller
				if (data.op){
					$scope.log_user = data.op;
					$scope.new_user = {};
					$scope.errors = '';
				} else {
					$scope.log_user = data;
					// $scope.users.push(data);
					$scope.new_user = {};
					$scope.errors = '';
					
				}
				// to dashboard
				$location.path('/');
			}
	
		});
	};
}]);

// QestionsController
app.controller('QestionsController', ['$scope', 'userFactory', 'questionFactory',  '$location', function($scope, userFactory, questionFactory, $location){
	$scope.log_user = {};
	$scope.questions = [];
	userFactory.getUser(function(data){
		$scope.log_user = data;
		console.log("data about logged user", $scope.log_user)
		if($scope.log_user == "loggedout_user"){
			$location.path('/index');
		}
	});
	questionFactory.index(function(data){
		$scope.questions = data;
	});

	$scope.logout = function(){
		userFactory.logout(function(){
			console.log("cleared log_user and redirecting to /index");
			$scope.log_user = "logeedout_user";
			console.log("$scope.log_user = ", $scope.log_user)
			$location.path('/index');
		});
	};
	
}]);

// NewQuestionController
app.controller('NewQuestionController', ['$scope', 'userFactory', 'questionFactory', '$location', function($scope, userFactory, questionFactory, $location){
	$scope.log_user = {};
	$scope.errors = '';
	userFactory.getUser(function(data){
		$scope.log_user = data;
		console.log("data about logged user", $scope.log_user)
		if($scope.log_user == "loggedout_user"){
			$location.path('/index');
		}
	});

	$scope.logout = function(){
		userFactory.logout(function(){
			console.log("cleared log_user and redirecting to /index");
			$scope.log_user = "logeedout_user";
			console.log("$scope.log_user = ", $scope.log_user)
			$location.path('/index');
		});
	};
	$scope.createQuestion = function(new_question){
		console.log("before adding new_friend ", new_question);
		questionFactory.create(new_question, function(data){
			console.log("added new question ", data);
			// if errors?
			if (!data._id){
				$scope.errors = data.errors.question.message;
			} else {
				$location.path('/');
			}
		});
	};
}]);

// ShowQuestionController
app.controller('ShowQuestionController', ['$scope', 'userFactory', 'questionFactory', 'answerFactory','$routeParams', '$location', function($scope, userFactory, questionFactory, answerFactory, $routeParams, $location){
	$scope.log_user = {};
	$scope.question = {};
	userFactory.getUser(function(data){
		$scope.log_user = data;
		console.log("data about logged user", $scope.log_user)
		if($scope.log_user == "loggedout_user"){
			$location.path('/index');
		}
	});
	questionFactory.show($routeParams.id, function(data){
		console.log("data from show ", data);
		$scope.question = data;
	});
	$scope.logout = function(){
		userFactory.logout(function(){
			console.log("cleared log_user and redirecting to /index");
			$scope.log_user = "logeedout_user";
			console.log("$scope.log_user = ", $scope.log_user)
			$location.path('/index');
		});
	};
	$scope.updateLikes = function(id){
		answerFactory.update(id, function(data){
			console.log("data from update factory ", data);
			// $location.path('/');
			$scope.question = data;
		});
	};
}]);

// NewAnswerController
app.controller('NewAnswerController', ['$scope', 'userFactory', 'questionFactory', 'answerFactory','$routeParams', '$location', function($scope, userFactory, questionFactory, answerFactory, $routeParams, $location){
	$scope.log_user = {};
	$scope.question = {};
	$scope.errors = '';
	userFactory.getUser(function(data){
		$scope.log_user = data;
		console.log("data about logged user", $scope.log_user)
		if($scope.log_user == "loggedout_user"){
			$location.path('/index');
		}
	});
	questionFactory.show($routeParams.id, function(data){
		console.log("data from show ", data);
		$scope.question = data;
	});
	$scope.logout = function(){
		userFactory.logout(function(){
			console.log("cleared log_user and redirecting to /index");
			$scope.log_user = "logeedout_user";
			console.log("$scope.log_user = ", $scope.log_user)
			$location.path('/index');
		});
	};
	$scope.createAnswer = function(new_answer){
		console.log("before adding new_answer ", new_answer);
		new_answer.question_id = $routeParams.id;
		answerFactory.create(new_answer, function(data){
			console.log("added new answer ", data);
			// if errors?
			if (!data._id){
				$scope.errors = data.errors.answer.message;
			} else {
				$location.path('/');
			}
		});
	};
}]);





