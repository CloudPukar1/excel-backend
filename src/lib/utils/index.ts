import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

export const asyncHandler = <T>(
  cb: (req: Request, res: Response, next: NextFunction) => T
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (error: any) {
      error.status = error instanceof JsonWebTokenError ? 401 : 500;
      next(error);
    }
  };
};

interface ICustomError {
  message: string;
  status: number;
}

export class CustomError extends Error {
  status: number = 500;

  constructor({ message, status }: ICustomError) {
    super(message);
    this.status = status;
  }
}
