// db.js
console.log("loading the db file - db.js");

var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/questions';

// var reg = new RegExp( ".js$", "i" );
/*
* Connect to the database
*/
mongoose.connect(dbUrl);

var fs = require('fs');
var path = require('path');
var models_path = path.join(__dirname, '/../models');
/*
*  CONNECTION EVENTS
*  When successfully connected
*/
mongoose.connection.on( 'connected', function () {
  console.log( `Mongoose default connection open to ${ dbUrl }` );
});
/*
*  If the connection throws an error
*/
mongoose.connection.on( 'error', function ( err ) {
  console.error( `Mongoose default connection error: ${ err }` );
});
/*
*  When the connection is disconnected
*/
mongoose.connection.on( 'disconnected', function () {
  console.log( 'Mongoose default connection disconnected' );
});
/*
*  If the Node process ends, close the Mongoose connection
*/
process.on( 'SIGINT', function() {
  mongoose.connection.close( function () {
    console.log( 'Mongoose default connection disconnected through app termination' );
    process.exit( 0 );
  });
});


fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js')>0) {
		console.log(models_path + '/' + file);
		require(models_path+'/'+file);
	}
});
// with RegExp
// fs.readdirSync( models_path ).forEach( function( file ) {
//   if( reg.test( file ) ) {
//     require( path.join( models_path, file ) );
//   }
// });