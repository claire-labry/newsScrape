const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  saved: {
    type: Boolean,
    default: false,
  },
  note: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
});

// creates article model, using mongoose's method
const Article = mongoose.model('Article', ArticleSchema);

// exports the article model
module.exports = Article;
