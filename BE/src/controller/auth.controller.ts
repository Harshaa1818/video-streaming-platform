import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as argon from "argon2";
import prisma from "../utils/prisma";

interface User extends Request {
  user?: {
    id: number;
    email: string;
  };
}

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

export async function SignIn(Req: Request, Res: Response): Promise<void> {
  const { email, password }: { email: string; password: string } = Req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      Res.status(400).json({
        message: "Invalid email or password",
      });
      return;
    }
    const isValid = await argon.verify(user.password, password);
    if (!isValid) {
      Res.status(400).json({
        message: "Invalid email or password",
      });
      return;
    }
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined");
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.SECRET_KEY
    );
    Res.status(200).json({
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

export async function GetUser(Req: User, Res: Response): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Req.user?.id!,
      },
      select: {
        email: true,
      },
    });
    if (!user) {
      Res.status(404).json({
        message: "User not found",
      });
      return;
    }
    Res.status(200).json({
      user,
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
