var express = require("express");
var path = require("path")
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/quoting_dojo");
var bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "./static")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// Create Mongoose Schema
var UserSchema = new mongoose.Schema({
	name: String,
	quote: String
})

// Validations
UserSchema.path("name").required(true, "Name cannot be blank");
UserSchema.path("quote").required(true, "Quote cannot be blank");

// Store Schema under name "User"
mongoose.model("User", UserSchema);

// Retrieve Schema called "User" and store it in variable User
var User = mongoose.model("User");

// Routes
app.get("/", function(req, res){
	res.render("index");
})

app.post("/quotes", function(req, res){
	console.log("POST DATA" + req.body.name + req.body.quote);
	var user = new User({name: req.body.name, quote: req.body.quote});
	user.save(function(err){
		if(err){
			console.log("didn't save");
			res.render("error", {error: user.errors});

		} else{
			console.log("saved");
			res.redirect("/quotes");
		}
	});

});

app.get("/quotes", function(req, res){
	User.find({}, function(err, users){
		if(err){
			console.log("err")
		} else{
			console.log("got users/quotes");
			res.render("main", {quotes: users});
		};
	})
	// res.render("main");
})

// Setting Server to Listen
app.listen(6789, function(){
	console.log("Listening for Quotes on Port 6789");
})