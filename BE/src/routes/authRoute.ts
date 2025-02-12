import express from "express";
import { Signup, SignIn, GetUser } from "../controller/auth.controller";
import jwtMiddleware from "../middleware/jwt.middleware";

const AuthRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     description: Create a new user account with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid request data
 */
AuthRouter.post("/signup", Signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     description: Authenticate user and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Invalid credentials
 */
AuthRouter.post("/login", SignIn);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user details
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     description: Fetch details of the logged-in user using a JWT token.
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       401:
 *         description: Unauthorized, token missing or invalid
 */
AuthRouter.get("/me", jwtMiddleware, GetUser);

export default AuthRouter;
