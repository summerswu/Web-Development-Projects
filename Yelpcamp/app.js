var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");//db and body parser

var passport = require("passport");
var LocalStrategy = require("passport-local");//authen import 

var seedDB = require("./seeds.js");//seed model

var User = require("./models/user");
var Campground = require("./models/campground");
var Comment = require("./models/comment");//user and model imports

seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useNewUrlParser: true });//db connection

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static( __dirname + "/public"));
console.log( __dirname );//view engine and css locating

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest ",
    resave: false,
    saveUninitialized: false
}));//authen session 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());//authen user fuctions - black box

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});//propagate user

app.get("/", function(req, res){
   res.render("landing"); 
});//get landing page

var comments = require("./routes/comments"),
    campgrounds = require("./routes/campground"),
    indexRoute = require("./routes/index");
    
app.use(campgrounds);
app.use(comments);
app.use(indexRoute);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started");
});//start the server 

