var router = require("express").Router();
const { requiresAuth } = require("express-openid-connect");

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Auth0 Webapp sample Nodejs",
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

router.get("/profile", function (req, res, next) {
  res.render("index", { title: "Profile" });
});

module.exports = router;
