const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BlogPost = require("./models/BlogPost");

const app = new express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({});
  console.log(blogposts);
  const term = req.body.searchTerm;
  res.render("index", { blogposts, term });
});

app.post("/search", async (req, res) => {
  const blogposts = await BlogPost.find({
    $or: [
      { title: { $regex: req.body.searchTerm, $options: "i" } },
      { body: { $regex: req.body.searchTerm, $options: "i" } },
    ],
  });
  const term = req.body.searchTerm;
  console.log(blogposts);
  res.render("index", { blogposts, term });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.get("/post/new", (req, res) => {
  res.render("create");
});

app.post("/post/store", async (req, res) => {
  await BlogPost.create(req.body);
  res.redirect("/");
});
