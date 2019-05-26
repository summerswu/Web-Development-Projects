var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req,res){
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
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   foundCampground.comments.push(comment);
                   foundCampground.save();
                   req.flash("success", "Comment Posted");
                   res.redirect("/campgrounds/" + foundCampground._id)
               }
           });
       }
   });
});

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn,function(req,res){
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

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    
    Comment.findById(req.params.comment_id,function(err, foundComment) {
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.render("./comments/edit", {comment:foundComment, campground_id:req.params.id});
        }
    });
});

router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req,res){
   //get data from form and add to the campgrounds array\
 
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
       if(err){
           console.log(err);
       }
       else{
           req.flash("success", "Comment Updated");
           res.redirect("/campgrounds/" + req.params.id);
       }
   })
});

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, updatedBlog){
        if(err){
            req.flash("error", "Could not delete campground");
            res.redirect("/Campgrounds")
        }
        else{
            req.flash("success", "Comment Deleted");
            res.redirect("/Campgrounds/" + req.params.id);
        }
    })
});

module.exports = router;
