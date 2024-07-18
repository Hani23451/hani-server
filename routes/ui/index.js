const router = require("express").Router();
const User = require("../../models/User");
const authAdminValidation = require("../../middlewares/adminValidation");
router.get("/", authAdminValidation, (req, res) => {
  res.render("pages/home", { name: "Chris Martin" });
});

// Route to get users and render the page
router.get("/users", authAdminValidation, async (req, res) => {
  try {
    const users = await User.find(); // Fetch users from the database
    res.render("pages/Users", { users }); // Pass users data to the EJS template
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/gems", authAdminValidation, async (req, res) => {
  try {
    // Fetch users from the database
    res.render("pages/gemsBundle"); // Pass users data to the EJS template
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
router.get("/contact", authAdminValidation, async (req, res) => {
  try {
    // Fetch users from the database
    res.render("pages/contact"); // Pass users data to the EJS template
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
router.get("/stories", authAdminValidation, async (req, res) => {
  try {
    // Fetch users from the database
    res.render("pages/stories"); // Pass users data to the EJS template
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
router.get("/question", authAdminValidation, async (req, res) => {
  try {
    // Fetch users from the database
    res.render("pages/question"); // Pass users data to the EJS template
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
router.get("/login", async (req, res) => {
  try {
    // Fetch users from the database
    res.render("pages/login"); // Pass users data to the EJS template
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
