const BlogPost = require("../models/BlogPost.js");

module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({
    $or: [
      { title: { $regex: req.body.searchTerm, $options: "i" } },
      { body: { $regex: req.body.searchTerm, $options: "i" } },
    ],
  });
  const term = req.body.searchTerm;
  console.log(blogposts);
  res.render("index", { blogposts, term });
};
