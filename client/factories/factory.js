// factory.js
console.log("loading factory");

// userFactory
app.factory('userFactory', ['$http', function($http){
	return (function($http){
		var logged_user = "loggedout_user";
		function userFactory(){
			this.getUser = function(callback){
				callback(logged_user);
			};
			// create or login
			this.create = function(user, callback){
				console.log("user data recieved from controller ", user);
				$http.post('/users', user).then(function(data){
					console.log("data recieved from the server in the create user factory ", data);
					// return data to controller
					if (typeof(callback) === 'function'){
						// add new friend to the friends array? - it updates when comes back to the root route
						if (data.data._id){
							logged_user = data.data;
						} else if (data.data.op){
							logged_user = data.data.op;
						}
						callback(data.data);
					}
				});
			};
			this.logout = function(callback){
				logged_user = "loggedout_user";
				console.log('loging out from factory');
				callback(logged_user);
			};
		}
		return new userFactory();
	})($http);

}]);

// questionFactory
app.factory('questionFactory', ['$http', function($http){
	return (function($http){
		function questionFactory(){
			var questions = [];
			var question = {};
			this.index = function(callback){
				$http.get('/questions').then(function(data){
					console.log('data from index factory',data.data);
					questions = data.data;
					if (typeof(callback) === 'function'){
						callback(questions);
					}
				});
			};
			
			this.create = function(question, callback){
				console.log("question data recieved from controller ", question);
				$http.post('/questions', question).then(function(data){
					console.log("data recieved from the server in the create question factory ", data);
					// return data to controller
					if (typeof(callback) === 'function'){
						callback(data.data);
					}
				});
			};
			this.show = function(id, callback){
				console.log("id from factory ", id);
				console.log('/questions/'+id);
				$http.get("/questions/"+id).then(function(data){
					console.log(data.data);
					if (typeof(callback) === 'function'){
						callback(data.data);
					}
				});
			};
		}
		return new questionFactory();
	})($http);
}]);

// answerFactory
app.factory('answerFactory', ['$http', function($http){
	return (function($http){
		function answerFactory(){
			this.create = function(answer, callback){
				console.log("answer data recieved from controller ", answer);
				$http.post('/answers', answer).then(function(data){
					console.log("data recieved from the server in the create question factory ", data);
					// return data to controller
					if (typeof(callback) === 'function'){
						callback(data.data);
					}
				});
			};
			this.update = function(id, callback){
				console.log("answer id data from factory ", id);
				$http.put('/answers/'+id).then(function(data){
					console.log("data from update from server ", data.data);
					$http.get("/questions/"+data.data._question).then(function(data){
						console.log(data.data);
						if (typeof(callback) === 'function'){
							callback(data.data);
						}
					});
				});
			};
		}
		return new answerFactory();
	})($http);
}]);

