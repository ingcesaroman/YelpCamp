var express    = require("express"),
	app 	   = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Leonard Hofstadter", 
// 		image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg"
// 	}, 
// 	function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("NEWLY CREATED CAMPGROUND: ");
// 			console.log(campground);
// 		}
// 	});

//SUBTITUIDO POR MONGO variable campground sera sustituida por una base de datos en MongoDB pronto
// var campgrounds = [
// 		{name: "Sheldon Cooper", image: "https://cdn.pixabay.com/photo/2015/03/26/10/29/camping-691424__340.jpg"},
// 		{name: "Leonard Hofstadter", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg"},
// 		{name: "Rajesh Koothrappali ", image: "https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020__340.jpg"},
// 		{name: "Sheldon Cooper", image: "https://cdn.pixabay.com/photo/2015/03/26/10/29/camping-691424__340.jpg"},
// 		{name: "Leonard Hofstadter", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg"},
// 		{name: "Rajesh Koothrappali ", image: "https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020__340.jpg"},
// 		{name: "Sheldon Cooper", image: "https://cdn.pixabay.com/photo/2015/03/26/10/29/camping-691424__340.jpg"},
// 		{name: "Leonard Hofstadter", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg"},
// 		{name: "Rajesh Koothrappali ", image: "https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020__340.jpg"}
// 	]
	

app.get("/", function(req, res){
	res.render("landing");	
});

app.get("/campgrounds", function(req, res){
	//Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds:allCampgrounds});
		}
	});		
});

app.post("/campgrounds", function(req, res){
	//Get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	//Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect bac to campgrounds page
			res.redirect("/campgrounds");	
		}
	});
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.listen(3000, function(){
	console.log("the YelpCamp Server has Started!");
});