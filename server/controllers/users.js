// users.js
console.log("loading the controller file - users.js");

module.exports = (function(){
	var mongoose = require('mongoose');
	var User = mongoose.model('User');
	var path = require('path');

	function usersController(){
		this.create = function(req, res){
			console.log("post data", req.body);
			// check if user name is unique
			// inserting new user into db
			var user = new User({name: req.body.name});
			user.save(function(err, result){
				console.log("errors - ", err);
				console.log("result - ", result);
				if(err){
					console.log('something went wrong while saving a new friend data', err);
					res.json(err);
				} else {
					console.log("successfully added a new friend!", result);
					res.json(result);
				}
			});
		};
	}
	return new usersController();
})();