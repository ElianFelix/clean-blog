const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const expressSession = require("express-session");

const app = new express();
mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(expressSession({ secret: "guitar dog" }));

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

const validateMiddleware = require("./middleware/validationMiddleware");
app.use("/posts/store", validateMiddleware);

const authMiddleware = require("./middleware/authMiddleware");

const homeController = require("./controllers/home");
app.get("/", homeController);

const searchPostController = require("./controllers/searchPost");
app.post("/search", searchPostController);

const getPostController = require("./controllers/getPost");
app.get("/post/:id", getPostController);

const newPostController = require("./controllers/newPost");
app.get("/posts/new", authMiddleware, newPostController);

const storePostController = require("./controllers/storePost");
app.post("/posts/store", authMiddleware, storePostController);

const newUserController = require("./controllers/newUser");
app.get("/auth/register", newUserController);

const loginController = require("./controllers/login");
app.get("/auth/login", loginController);

const storeUserController = require("./controllers/storeUser");
app.post("/users/register", storeUserController);

const loginUserController = require("./controllers/loginUser");
app.post("/users/login", loginUserController);
