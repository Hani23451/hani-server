const expressAsyncHandler = require("express-async-handler");
const GemsBundle = require("../../models/GemsBundle");
const Questions = require("../../models/Questions");
// Controller function to get all gems and render the page
exports.getAllGems = expressAsyncHandler(async (req, res) => {
  try {
    const gemsBundles = await GemsBundle.find();
    res.status(200).json({ gemsBundles }); // Render the page with the gemsBundles data
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
exports.getAllQuestions = expressAsyncHandler(async (req, res) => {
  try {
    const questions = await Questions.find();
    res.status(200).json({ questions }); // Render the page with the gemsBundles data
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
