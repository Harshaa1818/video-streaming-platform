import express from "express";
import {
  CreateMeeting,
  GetMeetings,
  JoinMeeting,
  LeaveMeeting,
  StartMeeting,
  EndMeeting,
  DeleteMeeting,
  MeetingStatus,
  UpdateStatus,
} from "../controller/meeting.controller";
import jwtMiddleware from "../middleware/jwt.middleware";
import MeetingOwnerMiddleware from "../middleware/meetingOwner.middleware";

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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meeting retrieved successfully
 *       404:
 *         description: Meeting not found
 */
meetingRouter.get("/get/:id", jwtMiddleware, GetMeetings);

/**
 * @swagger
 * /api/meeting/join/{meetingId}:
 *   post:
 *     summary: Join a meeting
 *     tags: [Meetings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: meetingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully joined the meeting
 *       404:
 *         description: Meeting not found
 */
meetingRouter.post("/join/:meetingId", jwtMiddleware, JoinMeeting);

/**
 * @swagger
 * /api/meeting/leave/{meetingId}:
 *   post:
 *     summary: Leave a meeting
 *     tags: [Meetings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: meetingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully left the meeting
 *       404:
 *         description: Meeting not found
 */
meetingRouter.post("/leave/:meetingId", jwtMiddleware, LeaveMeeting);

/**
 * @swagger
 * /api/meeting/start/{meetingId}:
 *   post:
 *     summary: Start a meeting
 *     tags: [Meetings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: meetingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meeting started
 */
meetingRouter.post(
  "/start/:meetingId",
  jwtMiddleware,
  MeetingOwnerMiddleware,
  StartMeeting
);

/**
 * @swagger
 * /api/meeting/end/{meetingId}:
 *   post:
 *     summary: End a meeting
 *     tags: [Meetings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: meetingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meeting ended
 */
meetingRouter.post(
  "/end/:meetingId",
  jwtMiddleware,
  MeetingOwnerMiddleware,
  EndMeeting
);

/**
 * @swagger
 * /api/meeting/delete/{meetingId}:
 *   delete:
 *     summary: Delete a meeting
 *     tags: [Meetings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: meetingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Meeting deleted
 */
meetingRouter.delete(
  "/delete/:meetingId",
  jwtMiddleware,
  MeetingOwnerMiddleware,
  DeleteMeeting
);

/**
 * @swagger
 * /api/meeting/status/{meetingId}:
 *   get:
 *     summary: Get meeting status
 *     tags: [Meetings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: meetingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meeting status retrieved
 */
meetingRouter.get("/status/:meetingId", jwtMiddleware, MeetingStatus);

/**
 * @swagger
 * /api/meeting/update-status/{meetingId}:
 *   patch:
 *     summary: Update meeting status
 *     tags: [Meetings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: meetingId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Meeting status updated
 */
meetingRouter.patch(
  "/update-status/:meetingId",
  jwtMiddleware,
  MeetingOwnerMiddleware,
  UpdateStatus
);

export default meetingRouter;
