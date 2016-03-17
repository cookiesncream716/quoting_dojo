// require mongoose
var mongoose = require('mongoose');

// create the schema
var UserSchema = new mongoose.Schema({
  name: String,
  quote: String
})

// Validations
UserSchema.path("name").required(true, "Name cannot be blank");
UserSchema.path("quote").required(true, "Quote cannot be blank");

// register the schema as a model
// shouldn't actually need to store it in a variable because we shouldn't be calling in in this file
var User = mongoose.model('User', UserSchema);