const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Use Schema constructor to create a new NoteSchema object
const NoteSchema = new Schema({
  title: String,
  body: String,
});

// Creates the model from schema from above, using mongoose's model method
const Note = mongoose.model('Note', NoteSchema);

// Export the Note model
module.exports = Note;
