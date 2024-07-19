const router = require("express").Router();

const {
  AdminLogin,
  createGemsBundle,
  deleteGemsBundle,
  createQuestion,
  deleteQuestion,
} = require("../../controllers/admin/index");
router.post("/auth", AdminLogin);
router.post("/create-gems", createGemsBundle);
router.delete("/delete-gems/:id", deleteGemsBundle);
router.delete("/delete-question/:id", deleteQuestion);
            
// create questions
router.post("/create-question", createQuestion);
module.exports = router;
