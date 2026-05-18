import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const auth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.status(401)
      .json({
        message:"No token"
      });

    }

    const token =
      authHeader.split(" ")[1];
      

    const decoded =
    jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    req.user = decoded;

    next();

  } catch {

    return res.status(401)
    .json({
      message:
      "Invalid token"
    });

  }

};