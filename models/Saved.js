var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var SavedSchema = new Schema({
  
   // `article` is an object that stores an Article id
  // The ref property links the ObjectId to the Article model
  // This allows us to populate the Saved object with an associated Article
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  }

});

// This creates our model from the above schema, using mongoose's model method
var Saved = mongoose.model("Saved", SavedSchema);

// Export the Article model
module.exports = Article;
