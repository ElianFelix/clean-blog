const mongoose = require("mongoose");

const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

BlogPost.create(
  {
    title: "The Mythbuster's guide to saving money on energy bills",
    body: "lorem ipsum",
  },
  (error, blogpost) => {
    console.log(error, blogpost);
  }
);
