var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var autoIncrement = require("mongodb-autoincrement");
var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'www')));
function pushtodb(req){
MongoClient.connect(url, function(err, db) 
{
	var Collectionname="ServiceCenter";
	var dbo = db.db("data");
	autoIncrement.getNextSequence(dbo,Collectionname, function (err, autoIndex) {
	var myobj = req.body;
	var temppos=[];
	temppos[0]=parseFloat(myobj.location1);
	temppos[1]=parseFloat(myobj.location2);
	dbo.collection("ServiceCenter").insertOne({
	  _id: autoIndex,
	  Oname: myobj.Oname,
	  SPname: myobj.SPname,
	  Smartphone: myobj.Smartphone,
	  pno: myobj.pno,
	  altpno: myobj.altpno,
	  location1: myobj.location1,
	  location2: myobj.location2,
	  position:temppos,
	  otime: myobj.otime,
	  ctime: myobj.ctime,
	  estyear: myobj.estyear,
	  countofservices:myobj.countofservices,
	  services:myobj.services,
	  countofvehicles:myobj.countofvehicles,
	  vehicles:myobj.vehicles}, function(err, res) {
	  if (err) throw err;
	  console.log("1 document inserted");
	  db.close();
	});
});
});
}
app.post('/form',function(req, res){
	res.setHeader('Content-Type', 'application/json');
	console.log(req.body);
	res.send(JSON.stringify(req.body));
	pushtodb(req);
});
app.post('/search',function(req, res){
	res.setHeader('Content-Type', 'application/json');
	console.log(req.body['query']);	
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("data");
		dbo.collection("ServiceCenter").findOne({_id: parseInt(req.body['query'])}, function(err, result) {
			if (err) throw err;
			console.log(result);
			db.close();
			res.send(JSON.stringify(result));
		});
	}); 	
});

app.post('/searchlocality',function(req, res){
	res.setHeader('Content-Type', 'application/json');
	MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("data");
			dbo.collection("ServiceCenter").ensureIndex( { position : "2d" } )
			dbo.collection("ServiceCenter").findOne( { position : { $near : [ parseFloat(req.body['latsearch']),parseFloat(req.body['longsearch'])] } } ,function(err, result) {
					if (err) throw err;
					console.log("hai");
					db.close();
					res.send(JSON.stringify(result));
					console.log(result);
				});
	});
}); 


app.post('/update',function(req, res){
	res.setHeader('Content-Type', 'application/json');
	console.log(req.body['query']);
	myobj=req.body;
	MongoClient.connect(url, function(err, db) {
  	if (err) throw err;
	  var dbo = db.db("data");
	  dbo.collection("ServiceCenter").remove({_id: parseInt(req.body['id'])}, function(err, result) {
		if (err) throw err;
		console.log("Deleted");
	}); 
	var temppos=[];
	temppos[0]=parseFloat(myobj.location1);
	temppos[1]=parseFloat(myobj.location2);
		dbo.collection("ServiceCenter").insertOne(
			{_id: parseInt(myobj.id),
			Oname: myobj.Oname,
		  SPname: myobj.SPname,
		  Smartphone: myobj.Smartphone,
		  pno: myobj.pno,
		  altpno: myobj.altpno,
		  location1: myobj.location1,
		  location2: myobj.location2,
		  position:temppos,
		  otime: myobj.otime,
		  ctime: myobj.ctime,
		  estyear: myobj.estyear,
		  countofservices:myobj.countofservices,
		  services:myobj.services,
		  countofvehicles:myobj.countofvehicles,
		  ehicles:myobj.vehicles}, function(err, res) {
		  if (err) throw err;
		  console.log("1 document updated");
		  db.close();
	  });
});
});
app.post('/delete',function(req, res){
	res.setHeader('Content-Type', 'application/json');
	console.log(req.body['query']);
	MongoClient.connect(url, function(err, db) {
  	if (err) throw err;
  	var dbo = db.db("data");
  dbo.collection("ServiceCenter").remove({_id: parseInt(req.body['query'])}, function(err, result) {
    if (err) throw err;
    console.log(result);
	db.close();
  });
}); 
});


app.listen(3000, function () {
  console.log('Server is running. Point your browser to: http://localhost:3000');
});