import type { Request, Response } from "express";
import prisma from "../utils/prisma";
import type { UserRequest } from "../types";
import { resourceUsage } from "process";

type MeetingBody = {
  title: string;
  description?: string;
  startTime: string;
  endTime?: string;
};

export async function CreateMeeting(
  Req: Request,
  Res: Response
): Promise<void> {
  const { title, description, startTime, endTime }: MeetingBody = Req.body;
  try {
    const userID = Req.userId;
    if (!userID) {
      Res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    const meeting = await prisma.meeting.create({
      data: {
        title,
        description,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        hostId: userID,
        status: "SCHEDULED",
      },
      include: {
        host: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    Res.status(201).json({
      meeting,
    });
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
          id: paramsID,
        },
        include: {
          host: {
            select: {
              id: true,
              name: true,
            },
          },
          participants: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          chatMessages: true,
          recordings: true,
          settings: true,
          invitations: true,
        },
      });
      if (!meeting) {
        Res.status(404).json({
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
        host: true,
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    Res.status(200).json({
      meetings,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    Res.status(500).json({
      message: errorMessage,
    });
  }
}

export async function JoinMeeting(Req: Request, Res: Response): Promise<void> {
  const meetingId = Req.params.meetingId;
  try {
    const userID = (Req as unknown as UserRequest).user?.id;
    if (!userID) {
      Res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    const meeting = await prisma.meeting.findUnique({
      where: {
        id: meetingId,
      },
      include: {
        participants: true,
      },
    });
    if (!meeting) {
      Res.status(404).json({
        message: "Meeting not found",
      });
      return;
    }
    const userInMeeting: boolean = meeting.participants.some(
      (p: { userId: string }) => p.userId === userID
    );
    if (userInMeeting) {
      Res.status(400).json({
        message: "User already in meeting",
      });
      return;
    }
    await prisma.participant.create({
      data: {
        userId: userID,
        meetingId: meetingId,
        role: "ATTENDEE",
      },
    });
    Res.status(200).json({
      message: "User joined meeting",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    Res.status(500).json({
      message: errorMessage,
    });
  }
}

export async function LeaveMeeting(Req: Request, Res: Response): Promise<void> {
  const meetingId = Req.params.meetingId;
  try {
    const userID = (Req as unknown as UserRequest).user?.id;
    if (!userID) {
      Res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    const participant = await prisma.participant.findFirst({
      where: {
        userId: userID,
        meetingId: meetingId,
      },
    });
    if (!participant) {
      Res.status(400).json({
        message: "User not in meeting",
      });
      return;
    }
    await prisma.participant.update({
      where: {
        id: participant.id,
      },
      data: {
        leftAt: new Date(),
      },
    });
    Res.status(200).json({
      message: "User left meeting",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    Res.status(500).json({
      message: errorMessage,
    });
  }
}

export async function StartMeeting(Req: Request, Res: Response): Promise<void> {
  const meetingId = Req.params.meetingId;
  try {
    const userID = (Req as unknown as UserRequest).user?.id;
    if (!userID) {
      Res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    const meeting = await prisma.meeting.findUnique({
      where: {
        id: meetingId,
      },
      include: {
        host: true,
      },
    });
    if (!meeting) {
      Res.status(404).json({
        message: "Meeting not found",
      });
      return;
    }
    if (meeting.hostId !== userID) {
      Res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    await prisma.meeting.update({
      where: {
        id: meetingId,
      },
      data: {
        status: "ONGOING",
      },
    });
    Res.status(200).json({
      message: "Meeting started",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    Res.status(500).json({
      message: errorMessage,
    });
  }
}

export async function EndMeeting(Req: Request, Res: Response): Promise<void> {
  const meetingId = Req.params.meetingId;
  try {
    const userID = (Req as unknown as UserRequest).user?.id;
    if (!userID) {
      Res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    const meeting = await prisma.meeting.findUnique({
      where: {
        id: meetingId,
      },
      include: {
        host: true,
      },
    });
    if (!meeting) {
      Res.status(404).json({
        message: "Meeting not found",
      });
      return;
    }
    if (meeting.hostId !== userID) {
      Res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    await prisma.meeting.update({
      where: {
        id: meetingId,
      },
      data: {
        status: "COMPLETED",
      },
    });
    Res.status(200).json({
      message: "Meeting ended",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    Res.status(500).json({
      message: errorMessage,
    });
  }
}

export async function DeleteMeeting(
  Req: Request,
  Res: Response
): Promise<void> {
  const meetingId = Req.params.meetingId;
  try {
    const userID = (Req as unknown as UserRequest).user?.id;
    if (!userID) {
      Res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    const meeting = await prisma.meeting.findUnique({
      where: {
        id: meetingId,
      },
      include: {
        host: true,
      },
    });
    if (!meeting) {
      Res.status(404).json({
        message: "Meeting not found",
      });
      return;
    }
    if (meeting.hostId !== userID) {
      Res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    await prisma.meeting.delete({
      where: {
        id: meetingId,
      },
    });
    Res.status(204).end();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    Res.status(500).json({
      message: errorMessage,
    });
  }
}

export async function MeetingStatus(
  Req: Request,
  Res: Response
): Promise<void> {
  const meetingId = Req.params.meetingId;
  try {
    const userID = (Req as unknown as UserRequest).user?.id;
    if (!userID) {
      Res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    const meeting = await prisma.meeting.findUnique({
      where: {
        id: meetingId,
      },
      include: {
        host: true,
      },
    });
    if (!meeting) {
      Res.status(404).json({
        message: "Meeting not found",
      });
      return;
    }
    Res.status(200).json({
      status: meeting.status,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    Res.status(500).json({
      message: errorMessage,
    });
  }
}

export async function UpdateStatus(Req: Request, Res: Response): Promise<void> {
  const meetingId = Req.params.meetingId;
  const status = Req.body.status;
  try {
    const userID = (Req as unknown as UserRequest).user?.id;
    if (!userID) {
      Res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    const meeting = await prisma.meeting.findUnique({
      where: {
        id: meetingId,
      },
      include: {
        host: true,
      },
    });
    if (!meeting) {
      Res.status(404).json({
        message: "Meeting not found",
      });
      return;
    }
    if (meeting.hostId !== userID) {
      Res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    await prisma.meeting.update({
      where: {
        id: meetingId,
      },
      data: {
        status: status,
      },
    });
    Res.status(200).json({
      message: "Meeting status updated",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    Res.status(500).json({
      message: errorMessage,
    });
  }
}
