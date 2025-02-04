import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as argon from "argon2";
import prisma from "../utils/prisma";

export async function Signup(Req: Request, Res: Response): Promise<void> {
  try {
    const {
      email,
      password,
    }: {
      email: string;
      password: string;
    } = Req.body;

    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      Res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password: await argon.hash(password),
      },
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.SECRET_KEY
    );
    Res.status(201).json({
      token,
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
