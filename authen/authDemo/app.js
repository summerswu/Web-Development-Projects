    var express = require("express");
    var mongoose = require("mongoose");
    var passport = require("passport");
    var bodyParser = require("body-parser");
    var localStrategy = require("passport-local");
    var passportLocalMongoose = require("passport-local-mongoose");
    var User = require("./models/user");
    
mongoose.connect("mongodb://localhost:27017/auth" ,{ useNewUrlParser: true });

var app = express();

app.set("view engine", "ejs"); 

app.use(passport.initialize());
app.use(bodyParser.urlencoded({extend: true}));
app.use(passport.session());


app.use(require("express-session")({
    secret: "Rusty the cutest",
    resave: false,
    saveUnitialized: false
}));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req,res){
    res.render("home");
});

app.get("/secret", function(req,res){
    res.render("secret");
});

//auth route

app.get("/register", function(req,res){
    res.render("register");
});

app.post("/register", function(req,res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req ,res, function(){
            res.redirect("/secret");
        });
    });
});

app.get("/login", function(req,res){
    res.render("login");
});

app.post("/login", passport.authenticate("local",{
        successRedirect: "/secret",
        failureRedirect: "/login"
}), function(req,res){
    
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server have started"); 
});