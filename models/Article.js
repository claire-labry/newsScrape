const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Use Schema constructor to create a new NoteSchema object
const ArticleSchema = new Schema({
  //  'title' is a string and it's being required
  title: {
    type: String,
    required: true,
  },
  //  'link' is a string and it's being required
  link: {
    type: String,
    required: true,
  },
  // 'img' is a string and it's being required
  img: {
    type: String,
  },

  saved: {
    type: Boolean,
    default: false,
  },

  // 'note' is an object that stores a Note id
  // the ref property links the ObjectId to the Note model
  // this will allow to populate the Article with an associated Note
  note: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
});

// Creates the model from schema from above, using mongoose's model method
const Article = mongoose.model('Article', ArticleSchema);

// Export the Article model
module.exports = Article;
