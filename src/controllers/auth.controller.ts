import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

import User from "../models/user.model";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const isUserExists = await User.findOne({ email: email });
    if (!isUserExists) {
      next({ status: 404, message: "Invalid Credentials" });
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserExists?.password!
    );
    if (!isPasswordMatched) {
      next({ status: 401, message: "Invalid Credentials" });
    }
    res.json({
      success: true,
      message: "Sheet data fetched successfully",
      data: isUserExists,
    });
  } catch (error) {
    next({ message: "Error Logging In" });
  }
};

