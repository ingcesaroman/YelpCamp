var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//variable campground sera sustituida por una base de datos en MongoDB pronto
var campgrounds = [
		{name: "Sheldon Cooper", image: "https://cdn.pixabay.com/photo/2015/03/26/10/29/camping-691424__340.jpg"},
		{name: "Leonard Hofstadter", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg"},
		{name: "Rajesh Koothrappali ", image: "https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020__340.jpg"},
		{name: "Sheldon Cooper", image: "https://cdn.pixabay.com/photo/2015/03/26/10/29/camping-691424__340.jpg"},
		{name: "Leonard Hofstadter", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg"},
		{name: "Rajesh Koothrappali ", image: "https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020__340.jpg"},
		{name: "Sheldon Cooper", image: "https://cdn.pixabay.com/photo/2015/03/26/10/29/camping-691424__340.jpg"},
		{name: "Leonard Hofstadter", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg"},
		{name: "Rajesh Koothrappali ", image: "https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020__340.jpg"}
	]
	

app.get("/", function(req, res){
	res.render("landing");	
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
	//get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	//redirect bac to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.listen(3000, function(){
	console.log("the YelpCamp Server has Started!");
});