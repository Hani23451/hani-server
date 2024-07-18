const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("pages/home", { name: "Chris Martin" });
});

router.get("/users", (req, res) => {
  res.render("pages/Users");
});

module.exports = router;
