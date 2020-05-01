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
	image: String,
	description: String
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

app.get("/", function(req, res){
	res.render("landing");	
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
	//Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds:allCampgrounds});
		}
	});		
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
	//Get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description
	var newCampground = {name: name, image: image, description: description}
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

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
})

//Conect server
app.listen(3000, function(){
	console.log("the YelpCamp Server has Started!");
});