var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err || !foundCampground){
               req.flash("error", "Can not find campground");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
                next();
            } else {
                req.flash("error", "This is not your campground");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "Please log in before proceeding");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req,res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err || !foundComment){
               req.flash("error", "Can not find comment");
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "This is not your comment");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You are not logged in");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function( req, res, next){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    } else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
        console.log("failed");
    }
}

module.exports = middlewareObj;