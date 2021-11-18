const express = require("express");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

const app = new express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

const validateMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title == null) {
    return res.redirect("/posts/new");
  }
  next();
};

app.use("/posts/store", validateMiddleWare);

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

app.get("/post/:id", async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  res.render("post", { blogpost });
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, "public/img", image.name), async (error) => {
    await BlogPost.create({ ...req.body, image: "/img/" + image.name });
    res.redirect("/");
  });
});
