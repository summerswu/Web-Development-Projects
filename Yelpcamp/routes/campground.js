var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


router.get("/campgrounds", function(req,res){
    Campground.find({},function(err,allcampground){
        if(err){
            console.log(err);
        }
        else{
             res.render("index",{campgrounds:allcampground, currentUser: req.user});
        }
    });
});

router.post("/campgrounds", function(req,res){
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

router.get("/campgrounds/new", isLoggedIn, function(req,res){
   //get data from form and add to the campgrounds array
   res.render("./campgrounds/new");
});

router.get("/campgrounds/:id", function(req,res){
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


function isLoggedIn( req, res, next){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    } else{
        res.redirect("/login");
        console.log("failed");
    }
}

module.exports = router;
