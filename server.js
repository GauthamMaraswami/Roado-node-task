//require the express nodejs module
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var express = require('express'),
	//set an instance of exress
	app = express(),
	//require the body-parser nodejs module
	bodyParser = require('body-parser'),
	//require the path nodejs module
	path = require("path");
	
//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true })); 

//tell express that www is the root of our public web folder
app.use(express.static(path.join(__dirname, 'www')));

function pushtodb(req){
MongoClient.connect(url, function(err, db) {
	var dbo = db.db("data");
	var myobj = req.body;
	dbo.collection("ServiceCenter").insertOne(myobj, function(err, res) {
	  if (err) throw err;
	  console.log("1 document inserted");
	  db.close();
	});
	//debugging output for the terminal
	
});
}


//tell express what to do when the /form route is requested
app.post('/form',function(req, res){
	res.setHeader('Content-Type', 'application/json');

	//mimic a slow network connection
	console.log(req.body);
	setTimeout(function(){

		res.send(JSON.stringify(req.body));
	}, 1000)
	pushtodb(req);
	console.log('you posted: First Name: ' + req.body.firstName + ', Last Name: ' + req.body.lastName);
	
});

//wait for a connection
app.listen(3000, function () {
  console.log('Server is running. Point your browser to: http://localhost:3000');
});