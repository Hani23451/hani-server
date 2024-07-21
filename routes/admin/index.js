const router = require("express").Router();

const {
  AdminLogin,
  createGemsBundle,
  deleteGemsBundle,
  createQuestion,
  deleteQuestion,
  createContact,
  createStory,
  deleteStory,
} = require("../../controllers/admin/index");
router.post("/auth", AdminLogin);
router.post("/create-gems", createGemsBundle);
router.delete("/delete-gems/:id", deleteGemsBundle);
router.delete("/delete-question/:id", deleteQuestion);
router.post("/add-contact", createContact);
router.post("/add-stroy", createStory);
// create questions
router.post("/create-question", createQuestion);
router.post("/stories/delete/:id", deleteStory);
module.exports = router;
