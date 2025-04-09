import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../lib/utils";
import { verify } from "jsonwebtoken";

type User = {
  _id: string;
  name: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization?.split(`"`)[1];
    if (!token) return next({ status: 401, message: "Unauthorized" });
    const decoded = verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as User;

    next();
  }
);
