const router = require("express").Router();

const {
  AdminLogin,
  createGemsBundle,
  deleteGemsBundle
} = require("../../controllers/admin/index");
router.post("/auth", AdminLogin);
router.post("/create-gems", createGemsBundle);
router.delete('/delete-gems/:id', deleteGemsBundle);
module.exports = router;
