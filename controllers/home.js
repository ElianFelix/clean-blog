const BlogPost = require("../models/BlogPost.js");

module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({});
  console.log(blogposts);
  const term = req.body.searchTerm;
  res.render("index", { blogposts, term });
};
