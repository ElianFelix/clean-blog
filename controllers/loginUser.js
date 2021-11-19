const bcrypt = require("bcrypt");
const User = require("../models/User.js");

module.exports = (req, res) => {
  const { username, password } = req.body;
  const credError = ["Wrong username or password"];

  User.findOne({ username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          console.log(same);
          res.redirect("/");
        } else {
          req.flash("validationErrors", credError);
          req.flash("data", username);
          res.redirect("/auth/login");
        }
      });
    } else {
      req.flash("validationErrors", credError);
      req.flash("data", username);
      res.redirect("/auth/login");
    }
  });
};
