module.exports = (req, res) => {
  res.render("login", {
    errors: req.flash("validationErrors"),
    username: req.flash("data")[0],
  });
};
