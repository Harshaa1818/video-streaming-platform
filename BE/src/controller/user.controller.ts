import prisma from "../utils/prisma";
import { Request, Response } from "express";

export const GetAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const GetUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.user.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
