const asyncHandler = require("express-async-handler");
const GemsBundle = require("../../models/GemsBundle");
const Questions = require("../../models/Questions");
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
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
});
exports.createQuestion = asyncHandler(async (req, res) => {
  const { answer, question } = req.body;

  if (!answer || !question) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newQuestion = await Questions.create({ question, answer }); 
    console.log(newQuestion);
    res
      .status(201)
      .json({ success: true, message: "Question  created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
});
exports.deleteQuestion= async (req, res) => {
  try {
    const { id } = req.params;
    await Questions.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Question  deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteGemsBundle = async (req, res) => {
  try {
    const { id } = req.params;
    await GemsBundle.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Gems Bundle deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
