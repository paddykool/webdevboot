const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Schema - lays out foundations for all new fruit documents
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
})

// Then use Schema to create a Mongoose model
// First variable is the singular and
// mongoose will puralise it to make the collection
const Fruit = mongoose.model("Fruit", fruitSchema)

// create new fruit documents from Fruit schema
const fruit = new Fruit({
  name: "Apple",
  rating: 55,
  review: "Meh"
})

// Save the fruit doc into the DB
fruit.save()


// Create a new Schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number
})

// Create a new model
const Person = mongoose.model("Person", personSchema)

// Now we can create a person document
const person = new Person({
  name: "John",
  age: 37
})

// person.save()


const kiwi = new Fruit({
  name: "kiwi",
  rating: 8,
  review: "Sweet"
})

const orange = new Fruit({
  name: "Orange",
  rating: 6,
  review: "Messy"
})
const banana = new Fruit({
  name: "Banana",
  rating: 10,
  review: "Super"
})

// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if (err)
//     console.log(err);
//   else
//     console.log("All saved grand");
// })

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err)
  }

  mongoose.connection.close();

  fruits.forEach((item, i) => {
    console.log("Fruit name: " + item.name)
  })



})
