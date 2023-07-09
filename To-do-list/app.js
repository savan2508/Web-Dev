const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const itemSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Welcome to your todolist"
})

const item2 = new Item({
    name: "Hit the + button to add a new item."
})

const item3 = new Item({
    name: "<-- Hit this to delete an items."
})

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});

const List = mongoose.model("List", listSchema)

app.get("/", function(req, res){
    Item.find({}).then(function(foundItems){
        if (foundItems.length === 0){
            Item.insertMany(defaultItems).then(function(){
                console.log("Successfully saved default items to DB.");
            })
                .catch(function(err){
                    console.log(err);
                });
            res.redirect("/")
        } else {
            res.render("list", {day: "It's a " + currentDay(),
                newListItems: foundItems,
                listTitle: currentDay()});
        }
    })
        .catch(function(err){
            console.log(err);
        });
});

app.get("/:customListName", function(req, res){
    const customListName = req.params.customListName;

    List.findOne({name: customListName}).then(function (foundList){
        if (!foundList) {
            // If the list doesn't exist, create a new one with default items
            const list = new List({
                name: customListName,
                items: defaultItems
            });

            list.save().then(function () {
                res.redirect("/" + customListName);
            });
        } else {
            res.render("list", { day: foundList.name + " list", newListItems: foundList.items, listTitle: foundList.name})
        }
    })
        .catch(function (err) {
            console.log(err);
        });
});

app.post("/", function(req, res){
    const extract_item = req.body.toDoItem;
    const listName = req.body.list;

    const newItem = new Item({
        name: extract_item
    });

    if (listName === currentDay()){
        newItem.save()
        res.redirect("/")
    }
    else {
        List.findOne({name: listName}).then(function (foundList){
            foundList.items.push(newItem)
            foundList.save().then(function (){
                res.redirect("/" + listName)
            })
        })
    }
});

app.post("/delete", function (req, res) {
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId).then(function(){
        console.log("Successfully deleted items from the DB.");
        res.redirect("/")
    })
        .catch(function(err){
            console.log(err);
        });
})

app.listen(3000, function(){
    console.log("Server is started on port 3000.");
});

function currentDay() {
    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    return today.toLocaleDateString("en-US", options);
}