module.exports = (req, res) => {
  let title,
    body = "";
  const blogData = req.flash("data")[0];

  if (typeof blogData != "undefined") {
    title = blogData.title;
    body = blogData.body;
  }

  if (req.session.userId) {
    return res.render("create", {
      errors: req.flash("validationErrors"),
      title,
      body,
      createPost: true,
    });
  }
  res.redirect("/auth/login");
};
