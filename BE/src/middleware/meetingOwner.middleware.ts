import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";

export default async function MeetingOwnerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const meetingId = req.params.id;
  const userId = req.body.userId;
  const meeting = await prisma.meeting.findUnique({
    where: { id: meetingId },
    select: {
      hostId: true,
    },
  });

  if (!meeting || meeting.hostId !== userId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  } else {
    next();
  }
}
