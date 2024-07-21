const router = require("express").Router();

const {
  getAllGems,
  getAllQuestions,
  createComplaint,
} = require("../../controllers/user/index");

/**
 * @swagger
 * /user/gems:
 *   get:
 *     summary: Retrieve all gems bundles
 *     tags:
 *       - Gems
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of gems bundles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gemsBundles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier for the gem bundle
 *                       name:
 *                         type: string
 *                         description: Name of the gem bundle
 *                       price:
 *                         type: number
 *                         description: Price of the gem bundle
 *                       count:
 *                         type: number
 *                         description: Count of gems in the bundle
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the gem bundle was created
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the gem bundle was last updated
 *       500:
 *         description: Internal server error
 */
router.get("/gems", getAllGems);

/**
 * @swagger
 * /user/questions:
 *   get:
 *     summary: Retrieve a list of all questions
 *     description: Retrieve a list of questions along with their answers.
 *     responses:
 *       200:
 *         description: A list of questions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The question ID.
 *                     example: 60c72b2f4f1a2c001f8e4b1e
 *                   question:
 *                     type: string
 *                     description: The question text.
 *                     example: "What is the capital of France?"
 *                   answer:
 *                     type: string
 *                     description: The answer to the question.
 *                     example: "Paris"
 *       500:
 *         description: Internal server error.
 */

router.get("/questions", getAllQuestions);

/**
 * @swagger
 * /user/create-Complaint:
 *   post:
 *     summary: Create a new complaint
 *     description: Endpoint to create a new complaint. Requires name, email, and message in the request body.
 *     tags:
 *       - Complaints
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the person making the complaint.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Email address of the person making the complaint.
 *                 example: john.doe@example.com
 *               message:
 *                 type: string
 *                 description: The content of the complaint.
 *                 example: "I am not happy with the service."
 *             required:
 *               - name
 *               - email
 *               - message
 *     responses:
 *       201:
 *         description: Complaint created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Complaint created successfully."
 *                 complaint:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique identifier for the complaint.
 *                       example: "607d0d5c3f2e1c001f6471d7"
 *                     name:
 *                       type: string
 *                       description: Name of the person making the complaint.
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       description: Email address of the person making the complaint.
 *                       example: "john.doe@example.com"
 *                     message:
 *                       type: string
 *                       description: The content of the complaint.
 *                       example: "I am not happy with the service."
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the complaint was created.
 *                       example: "2024-07-21T15:21:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the complaint was last updated.
 *                       example: "2024-07-21T15:21:00Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Validation error: Missing required fields."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Server error occurred."
 */

router.post("/create-Complaint", createComplaint);
module.exports = router;
