const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: { type: String, required: [true, "Please provide a title"] },
  body: { type: String, required: [true, "Please provide a body"] },
  username: String,
  datePosted: { type: Date, default: new Date() },
  image: { type: String, required: [true, "Please provide a body"] },
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;
