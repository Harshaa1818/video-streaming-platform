import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default async function jwtMiddleware(
  Req: Request,
  Res: Response,
  Next: NextFunction
): Promise<void> {
  const token = Req.headers.authorization?.split(" ")[1];
  if (!token) {
    Res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined");
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as {
      id: number;
      email: string;
    };
    Req.body.userId = decoded.id;
    Next();
  } catch (error) {
    Res.status(401).json({
      message: "Unauthorized",
    });
  }
}
