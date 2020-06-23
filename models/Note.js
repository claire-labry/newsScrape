const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
  title: String,
  body: String,
});

// creates note model, using mongoose's method
const Note = mongoose.model('Note', NoteSchema);

// exports the note model
module.exports = Note;
