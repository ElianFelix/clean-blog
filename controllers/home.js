const BlogPost = require("../models/BlogPost.js");

module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({}).populate("userid");
  console.log(req.session);
  const term = req.body.searchTerm;
  res.render("index", { blogposts, term });
};
