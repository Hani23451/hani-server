const expressAsyncHandler = require("express-async-handler");
const GemsBundle = require("../../models/GemsBundle");
const Questions = require("../../models/Questions");
const Complaints = require("../../models/Complaints");
const Settings = require("../../models/Settings");
const Stories = require("../../models/Stories");
const User = require("../../models/User");
const Relationship = require("../../models/RelationShip");
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

exports.createComplaint = expressAsyncHandler(async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newComplaint = new Complaints({ name, email, message });
    await newComplaint.save();

    res
      .status(201)
      .json({ success: true, message: "Complaint created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

exports.getContacts = expressAsyncHandler(async (req, res) => {
  try {
    const settings = await Settings.findOne();

    res.status(201).json({ success: true, data: settings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
exports.getStories = expressAsyncHandler(async (req, res) => {
  try {
    const stories = await Stories.find();

    res.status(201).json({ success: true, data: stories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

exports.linkCouples = expressAsyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.userId;
    console.log(req.user); // Get user ID from the verified token
    const linkedWord = req.body.linkedWord;

    if (!linkedWord) {
      return res
        .status(400)
        .json({ success: false, message: "linkedWord is required" });
    }

    // Update the current user with the linkedWord and set relationshipStatus to "pending"
    const user = await User.findByIdAndUpdate(
      userId,
      { linkedWord, relationshipStatus: "pending" },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log(user);
    const matchedUser = await User.findOne({
      linkedWord,
      _id: { $ne: userId },
    });

    if (matchedUser) {
      // Update both users to reference each other and set relationshipStatus to "accepted"
      user.relationshipStatus = "accepted";
      user.partner = matchedUser._id;

      matchedUser.relationshipStatus = "accepted";
      matchedUser.partner = user._id;

      await user.save();
      await matchedUser.save();

      return res.status(200).json({
        success: true,
        message: "linked successfully",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Account updated, waiting for a partner entering the word",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

exports.createRelationship = expressAsyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { engagementDate, marriageDate, proposalDate } = req.body;

    // Find the current user
    const user = await User.findById(userId).populate("partner");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "partner not found" });
    }

    // Find the partner
    const partner = user.partner;

    if (!partner) {
      return res
        .status(404)
        .json({ success: false, message: "No partner found for the user" });
    }

    // Create the relationship
    const relationship = await Relationship.create({
      user1: userId,
      user2: partner._id,
      engagementDate,
      marriageDate,
      proposalDate,
    });

    // Update both users' relationship statuses
    user.relationshipStatus = "completed";
    partner.relationshipStatus = "completed";

    await user.save();
    await partner.save();

    res.status(201).json({
      success: true,
      message: "Relationship created successfully",
      relationship,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
