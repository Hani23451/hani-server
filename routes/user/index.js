const router = require("express").Router();

const { getAllGems, getAllQuestions } = require("../../controllers/user/index");

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

module.exports = router;
