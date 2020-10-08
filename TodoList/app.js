//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// connect to DB and make DB if it doesn't exist
mongoose.connect(
  "mongodb+srv://admin-paddy:bdognom@cluster0.uuzmo.mongodb.net/todolistDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

// create a schema
const itemSchema = new mongoose.Schema({
  name: String,
})
//create a model using the schema - NB pass singular version of collection
const Item = mongoose.model("Item", itemSchema)

// create 3 new default itemsSchema
const item1 = new Item({
  name: "work"
})
const item2 = new Item({
  name: "music"
})
const item3 = new Item({
  name: "girl"
})
const defaultItems = [item1, item2, item3]

// stuff for new routes
const listSchema = {
  name: String,
  items: [itemSchema]
}
// new model
const List = mongoose.model("List", listSchema)


app.get("/", function(req, res) {
  Item.find({}, function(err, docs) {

    console.log("lenght of docs: " + docs.length)
    if (docs.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err)
          console.log("Shite: " + err)
        else {
          console.log("All grand")
        }
      })
      res.redirect("/")
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: docs
      });
    }
  })
});

app.post("/", function(req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name: itemName
  })

  if (listName === "Today") {
    newItem.save()
    res.redirect("/")
  } else {
    List.findOne({
      name: listName
    }, function(err, foundList) {
      foundList.items.push(newItem)
      foundList.save();
      res.redirect("/" + listName)
    })
  }
});

app.post("/delete", function(req, res) {
  const itemID = req.body.checkbox
  const listName = req.body.listName

  if (listName === "Today") {
    Item.findByIdAndRemove(itemID, function(err) {
      if (!err)
        console.log("Successfully deleted: " + itemID);
      res.redirect("/")
    })
  } else {
    List.findOneAndUpdate({
      name: listName
    }, {
      $pull: {
        items: {
          _id: itemID
        }
      }
    }, function(err, foundlist) {
      if (!err) {
        res.redirect("/" + listName)
      }
    })
  }
})

app.get("/:customList", function(req, res) {
  const customList = _.capitalize(req.params.customList)

  List.findOne({
    name: customList
  }, function(err, foundDoc) {
    console.log("The found list: " + foundDoc);
    if (!err) {
      console.log("There is no error")
      if (foundDoc) {
        // Show existing list
        res.render("list", {
          listTitle: foundDoc.name,
          newListItems: foundDoc.items
        });
      } else {
        // Create the new list
        const list = new List({
          name: customList,
          items: defaultItems
        })
        list.save()
        res.redirect("/" + customList)
      }
    }
  })



  // list.save()
})

// app.get("/work", function(req, res) {
//   res.render("list", {
//     listTitle: "Work List",
//     newListItems: workItems
//   });
// });

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
