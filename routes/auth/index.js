const router = require("express").Router();
const { Login, Register } = require("../../controllers/auth/index");
const {
  LoginValidator,
  RegisterValidator,
} = require("../../utils/validators/auth");
const swaggerUi = require("swagger-ui-express");
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login.
 *       401:
 *         description: Invalid credentials.
 */
router.post("/login", LoginValidator, Login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered.
 *       400:
 *         description: Bad request.
 */
router.post("/register", RegisterValidator, Register);
// asdfvsdfv
module.exports = router;
