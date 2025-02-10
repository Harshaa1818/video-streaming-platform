import prisma from "../utils/prisma";
import { Request, Response } from "express";

export async function GetParticipant(
  req: Request,
  res: Response
): Promise<void> {
  const meetingId = req.params.id;

  const participants = await prisma.participant.findMany({
    where: {
      meetingId,
    },
    select: {
      id: true,
      user: true,
    },
  });

  res.status(200).json(participants);

  return;
}

export async function isUserParticipant(
  Req: Request,
  Res: Response
): Promise<Response> {
  const meetingId = Req.params.id;
  const userId: string = Req.body.userId;
  const participant = await prisma.participant.findFirst({
    where: {
      meetingId,
      userId,
    },
  });

  if (participant) {
    return Res.status(200).json({
      isPartipant: true,
    });
  } else {
    return Res.status(500).json({
      isPartipant: false,
    });
  }
}
