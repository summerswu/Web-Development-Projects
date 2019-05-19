var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var seedDB = require("./seeds.js");

seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useNewUrlParser: true });
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static( __dirname + "/public"));
console.log( __dirname );

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req,res){
    Campground.find({},function(err,allcampground){
        if(err){
            console.log(err);
        }
        else{
             res.render("index",{campgrounds:allcampground});
        }
    });
});

app.post("/campgrounds", function(req,res){
   //get data from form and add to the campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image}
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       }
       else{
           res.redirect("/campgrounds");
       }
   });
});

app.get("/campgrounds/new", function(req,res){
   //get data from form and add to the campgrounds array
   res.render("./campgrounds/new");
});

app.get("/campgrounds/:id", function(req,res){
   //get data from form and add to the campgrounds array
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err){
          console.log(err);
      } 
      else{
           res.render("./campgrounds/show", {campgrounds: foundCampground});
      }
   });
  
});

app.post("/campgrounds/:id/comments", function(req,res){
   //get data from form and add to the campgrounds array
   Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else{
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
                   res.redirect("/campgrounds");
               }
               else{
                   foundCampground.comments.push(comment);
                   foundCampground.save();
                   res.redirect("/campgrounds/" + foundCampground._id)
               }
           });
       }
   });
});

app.get("/campgrounds/:id/comments/new", function(req,res){
   //get data from form and add to the campgrounds array\
   Campground.findById(req.params.id,function(err, foundCampground){
       if(err){
           console.log(err);
       }
       else{
           res.render("./comments/new", {campgrounds: foundCampground});
       }
   })
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started");
});

