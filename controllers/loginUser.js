const bcrypt = require("bcrypt");
const User = require("../models/User.js");

module.exports = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          console.log(same);
          res.redirect("/");
        } else {
          res.redirect("/auth/login");
        }
      });
    } else {
      res.redirect("/auth/login");
    }
  });
};