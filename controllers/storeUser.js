const User = require("../models/User.js");
const path = require("path");

module.exports = async (req, res) => {
  User.create(req.body, (error, user) => {
    //console.log(error);
    if (error) {
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      console.log(validationErrors);
      req.flash("validationErrors", validationErrors);
      req.flash("data", req.body);
      //req.session.validationErrors = validationErrors;
      return res.redirect("/auth/register");
    }
    res.redirect("/");
  });
};
