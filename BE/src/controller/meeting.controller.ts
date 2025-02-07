import { Request, Response } from "express";
import prisma from "../utils/prisma";
import jwt from "jsonwebtoken";
import { User, UserRequest } from "../types";

type MeetingBody = {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
};

export async function CreateMeeting(
  Req: Request,
  Res: Response
): Promise<void> {
  const { title, description, date, startTime, endTime }: MeetingBody =
    Req.body;
  try {
    const userID = (Req as unknown as UserRequest).user?.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });
    if (!user) {
      Res.status(400).json({
        message: "User not found",
      });
      return;
    }
    const meeting = await prisma.meeting.create({
      data: {
        title,
        description,
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        user: {
          connect: {
            id: user.id,
          },
        },
        include: {
          id: true,
          title: true,
          user: true,
        },
      },
    });
    Res.status(201).json({
      meeting,
    });
    return;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    Res.status(500).json({
      message: errorMessage,
    });
  }
}

export async function GetMeetings(Req: Request, Res: Response): Promise<void> {
  try {
    const paramsID = Req.params.id;
    if (paramsID) {
      const meeting = await prisma.meeting.findUnique({
        where: {
          id: parseInt(paramsID),
        },
        include: {
          users: true,
        },
      });
      if (!meeting) {
        Res.status(400).json({
          message: "Meeting not found",
        });
        return;
      }
      Res.status(200).json({
        meeting,
      });
      return;
    }
    const meetings = await prisma.meeting.findMany({
      include: {
        users: true,
      },
    });
    Res.status(200).json({
      meetings,
    });
    return;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    Res.status(500).json({
      message: errorMessage,
    });
  }
}

export async function JoinMeeting(Req: Request, Res: Response): Promise<void> {
  const meetingId: number = parseInt(Req.params.meetingId, 10);
  try {
    const userID = (Req as unknown as UserRequest).user?.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });
    if (!user) {
      Res.status(400).json({
        message: "User not found",
      });
      return;
    }
    const meeting = await prisma.meeting.findUnique({
      where: {
        id: meetingId,
      },
      include: {
        users: true,
      },
    });
    if (!meeting) {
      Res.status(400).json({
        message: "Meeting not found",
      });
      return;
    }
    const userInMeeting: User | undefined = meeting.users.find(
      (u: User) => u.id === user.id
    );
    if (userInMeeting) {
      Res.status(400).json({
        message: "User already in meeting",
      });
      return;
    }
    await prisma.meeting.update({
      where: {
        id: meetingId,
      },
      data: {
        users: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    Res.status(200).json({
      message: "User joined meeting",
    });
    return;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    Res.status(500).json({
      message: errorMessage,
    });
  }
}

export async function LeaveMeeting(Req: Request, Res: Response): Promise<void> {
  const meetingId: number = parseInt(Req.params.meetingId, 10);
  try {
    const userID = (Req as unknown as UserRequest).user?.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });
    if (!user) {
      Res.status(400).json({
        message: "User not found",
      });
      return;
    }
    const meeting = await prisma.meeting.findUnique({
      where: {
        id: meetingId,
      },
      include: {
        users: true,
      },
    });
    if (!meeting) {
      Res.status(400).json({
        message: "Meeting not found",
      });
      return;
    }
    const userInMeeting: User | undefined = meeting.users.find(
      (u: User) => u.id === user.id
    );
    if (!userInMeeting) {
      Res.status(400).json({
        message: "User not in meeting",
      });
      return;
    }
    await prisma.meeting.update({
      where: {
        id: meetingId,
      },
      data: {
        users: {
          disconnect: {
            id: user.id,
          },
        },
      },
    });
    Res.status(200).json({
      message: "User left meeting",
    });
    return;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    Res.status(500).json({
      message: errorMessage,
    });
  }
}
