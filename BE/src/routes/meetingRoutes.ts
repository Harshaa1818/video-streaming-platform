import express from "express";
import { CreateMeeting, GetMeetings } from "../controller/meeting.controller";
import jwtMiddleware from "../middleware/jwt.middleware";
const meetingRouter = express.Router();

meetingRouter.post("/create", jwtMiddleware, CreateMeeting);
meetingRouter.get("/get", jwtMiddleware, GetMeetings);
meetingRouter.get("/get/:id", jwtMiddleware, GetMeetings);
meetingRouter.post("/join/:id", jwtMiddleware, CreateMeeting);
meetingRouter.post("/leave/:id", jwtMiddleware, CreateMeeting);
