var router = require("express").Router();
const { requiresAuth } = require("express-openid-connect");

router.get("/api/", function (req, res, next) {
  // Updated route
  res.render("index", {
    title: "Auth0 Webapp sample Nodejs",
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

router.get("/api/profile", function (req, res, next) {
  // Updated route
  res.render("index", { title: "Profile" });
});

module.exports = router;
