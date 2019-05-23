var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

router.post("/campgrounds/:id/comments", isLoggedIn, function(req,res){
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

router.get("/campgrounds/:id/comments/new", isLoggedIn,function(req,res){
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
