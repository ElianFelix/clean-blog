module.exports = (req, res, next) => {
  if (req.files == null) {
    req.flash("validationErrors", ["Please provide an image"]);
    return res.redirect("/posts/new");
  }
  next();
};
