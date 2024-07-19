const asyncHandler = require("express-async-handler");
const GemsBundle = require("../../models/GemsBundle");
exports.AdminLogin = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    if (
      email.trim() === "therapist@gmail.com" &&
      password.trim() === "admin1234"
    ) {
      req.session.userId = 1; // Store user ID in session
      console.log("authorized");
      res.redirect("/");
    } else {
      console.log("unauthorized");
      return res.status(401).render("pages/login");
    }
  } catch (error) {
    console.log(error);
    res.status(500).render("pages/login", { error: "Internal server error" });
  }
});

exports.createGemsBundle = asyncHandler(async (req, res) => {
  const { name, price, count } = req.body;

  if (!name || !price || !count) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newGemsBundle = await GemsBundle.create({ name, price, count });
    res
      .status(201)
      .json({ success: true, message: "Gems bundle created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error, please try again later",
      });
  }
});
exports.deleteGemsBundle = async (req, res) => {
  try {
    const { id } = req.params;
    await GemsBundle.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Gems Bundle deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};