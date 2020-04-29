var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//variable campground sera sustituida por una base de datos en MongoDB pronto
var campgrounds = [
		{name: "Sheldon Cooper", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852547941752972dd9f4a_340.jpg"},
		{name: "Leonard Hofstadter", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e5074417d2f7ddd9e45c2_340.jpg"},
		{name: "Rajesh Koothrappali ", image: "https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e5074417d2f7ddd9e45c2_340.jpg"},
		{name: "Sheldon Cooper", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852547941752972dd9f4a_340.jpg"},
		{name: "Leonard Hofstadter", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e5074417d2f7ddd9e45c2_340.jpg"},
		{name: "Rajesh Koothrappali ", image: "https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e5074417d2f7ddd9e45c2_340.jpg"},
		{name: "Sheldon Cooper", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852547941752972dd9f4a_340.jpg"},
		{name: "Leonard Hofstadter", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e5074417d2f7ddd9e45c2_340.jpg"},
		{name: "Rajesh Koothrappali ", image: "https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e5074417d2f7ddd9e45c2_340.jpg"}
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