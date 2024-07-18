const router = require("express").Router();

const { AdminLogin } = require("../../controllers/admin/auth");
router.post("/auth", AdminLogin);

module.exports = router;
