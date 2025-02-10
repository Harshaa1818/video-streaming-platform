import { Request, Response } from "express";
import prisma from "../utils/prisma";

export default async function isAdmin(req: Request, res: Response, next: any) {
  const id = req.body.userId;
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      role: true,
    },
  });

  if (!user || user.role !== "admin") {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
}
