const mongoose = require('mongoose')

const { Schema, model } = mongoose;

const articleSchema = new Schema(
    {
      title: { type: String, required: true, unique: true }, //can say whether we want properties to be required or unique
      author: { type: String, required: true },
      body: String,
      comments: [{ body: String, commentDate: Date }], // can have arrays of objects with specific properties
      publishDate: { type: Date, default: Date.now }, // can set defaults for properties
      hidden: Boolean,
      meta: {
        // can have properties that are objects
        votes: { type: Number, default: 0},
        favs: Number,
      },
    },
    { timestamps: true }
  );
// articles
// common practice is to use Capital singular
  const Article = model('Article', articleSchema);

  module.exports = Article;