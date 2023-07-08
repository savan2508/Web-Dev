const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = [];
var workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

    res.render("list", {day: "It's a " + currentDay(), newListItems: items, listTitle: currentDay()});

});

app.get("/work", function(req, res){
    res.render("list", {day: "Work List for " + currentDay(), newListItems: workItems, listTitle: "work"})
});

app.post("/", function(req, res){
    var item = req.body.toDoItem;

    if (req.body.list === "work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.listen(3000, function(){
    console.log("Server is started on port 3000.");
});

function currentDay() {
    var today = new Date();
    var day = "";

    var options = {
        weekday: "long",
        day: "numeric",
        month:"long"
    };

    return day = today.toLocaleDateString("en-US", options);
}