var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true})); 

var campgrounds = [
        {name: "Salme Creek", image: "http://www.camp-liza.com/wp-content/uploads/2017/10/20170708_093155_HDR-1.jpg" },
        {name: "Graphite Hill", image: "https://www.pinetreesociety.org/wp-content/uploads/2017/10/cabins-960x600.jpg"},
        {name: "Goatee", image: "https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
        {name: "Salme Creek", image: "http://www.camp-liza.com/wp-content/uploads/2017/10/20170708_093155_HDR-1.jpg" },
        {name: "Graphite Hill", image: "https://www.pinetreesociety.org/wp-content/uploads/2017/10/cabins-960x600.jpg"},
        {name: "Goatee", image: "https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
        {name: "Salme Creek", image: "http://www.camp-liza.com/wp-content/uploads/2017/10/20170708_093155_HDR-1.jpg" },
        {name: "Graphite Hill", image: "https://www.pinetreesociety.org/wp-content/uploads/2017/10/cabins-960x600.jpg"},
        {name: "Graphite Hill", image: "https://www.pinetreesociety.org/wp-content/uploads/2017/10/cabins-960x600.jpg"},
        {name: "Goatee", image: "https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
        {name: "Salme Creek", image: "http://www.camp-liza.com/wp-content/uploads/2017/10/20170708_093155_HDR-1.jpg" },
        {name: "Graphite Hill", image: "https://www.pinetreesociety.org/wp-content/uploads/2017/10/cabins-960x600.jpg"}
    ];
    

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req,res){
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req,res){
   //get data from form and add to the campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image}
   campgrounds.push(newCampground); 
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
   //get data from form and add to the campgrounds array
   res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started");
});

