var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

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

router.post("/campgrounds", middleware.isLoggedIn, function(req,res){
   //get data from form and add to the campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
       id:req.user._id,
       username: req.user.username
   }
   var newCampground = {name: name, image: image, description: description, author: author}
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       }
       else{
           req.flash("success", "Camground Added");
           res.redirect("/campgrounds");
       }
   });
});

router.get("/campgrounds/new", middleware.isLoggedIn, function(req,res){
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

router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("./campgrounds/" + req.params.id);
        }
        else {
            res.render("./campgrounds/edit", {campgrounds: foundCampground})
        }
    });
});

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campgrounds, function(err, UpdatedCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            req.flash("success", "Camground Edited");
            res.redirect("/campgrounds/" + req.params.id)
        }
    });
});

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err, updatedBlog){
        if(err){
            res.redirect("/Campgrounds")
        }
        else{
            req.flash("success", "Camground Deleted");
            res.redirect("/Campgrounds");
        }
    })
});

module.exports = router;
