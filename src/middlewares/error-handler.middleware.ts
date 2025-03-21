import { NextFunction, Request, Response } from "express";

interface IError {
  message?: string;
  status?: number;
}

export const errorHandler = (
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = error?.message || "An Error occured";
  const status = error?.status || 500;
  res.status(500).json({ message, status, success: false });
};
