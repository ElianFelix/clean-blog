const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");

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

const homeController = require("./controllers/home");
app.get("/", homeController);

const searchPostController = require("./controllers/searchPost");
app.post("/search", searchPostController);

const getPostController = require("./controllers/getPost");
app.get("/post/:id", getPostController);

const newPostController = require("./controllers/newPost");
app.get("/posts/new", newPostController);

const storePostController = require("./controllers/storePost");
app.post("/posts/store", storePostController);
