import express from "express";
import {
  CreateMeeting,
  GetMeetings,
  JoinMeeting,
  LeaveMeeting,
} from "../controller/meeting.controller";
import jwtMiddleware from "../middleware/jwt.middleware";

const meetingRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Meetings
 *   description: API endpoints for managing meetings
 */

/**
 * @swagger
 * /api/meeting/create:
 *   post:
 *     summary: Create a new meeting
 *     tags: [Meetings]
 *     security:
 *       - BearerAuth: []
 *     description: Create a new meeting with provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - startTime
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Meeting created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */
meetingRouter.post("/create", jwtMiddleware, CreateMeeting);

/**
 * @swagger
 * /api/meeting/get:
 *   get:
 *     summary: Retrieve all meetings
 *     tags: [Meetings]
 *     security:
 *       - BearerAuth: []
 *     description: Fetch all scheduled meetings.
 *     responses:
 *       200:
 *         description: Successfully retrieved meetings
 *       401:
 *         description: Unauthorized
 */
meetingRouter.get("/get", jwtMiddleware, GetMeetings);

/**
 * @swagger
 * /api/meeting/get/{id}:
 *   get:
 *     summary: Get a specific meeting
 *     tags: [Meetings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Meeting ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meeting retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Meeting not found
 */
meetingRouter.get("/get/:id", jwtMiddleware, GetMeetings);

/**
 * @swagger
 * /api/meeting/join/{id}:
 *   post:
 *     summary: Join a meeting
 *     tags: [Meetings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Meeting ID to join
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully joined the meeting
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Meeting not found
 */
meetingRouter.post("/join/:id", jwtMiddleware, JoinMeeting);

/**
 * @swagger
 * /api/meeting/leave/{id}:
 *   post:
 *     summary: Leave a meeting
 *     tags: [Meetings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Meeting ID to leave
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully left the meeting
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Meeting not found
 */
meetingRouter.post("/leave/:id", jwtMiddleware, LeaveMeeting);

export default meetingRouter;
