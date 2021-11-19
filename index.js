const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const flash = require("connect-flash");

const app = new express();
mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(expressSession({ secret: "guitar dog" }));
app.use(flash());

global.loggedIn = null;

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

const validateMiddleware = require("./middleware/validationMiddleware");
app.use("/posts/store", validateMiddleware);

const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");

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
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);

const loginController = require("./controllers/login");
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);

const logoutController = require("./controllers/logout");
app.get("/auth/logout", logoutController);

const storeUserController = require("./controllers/storeUser");
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);

const loginUserController = require("./controllers/loginUser");
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);

app.use((req, res) => res.render("notfound"));

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
