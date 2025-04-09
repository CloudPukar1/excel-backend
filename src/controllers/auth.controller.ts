import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

import User from "../models/user.model";
import { CustomError } from "../lib/utils";
import { generateJwtToken } from "../lib/utils/helpers";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const isUserExists = await User.findOne({ email });
    if (!isUserExists) {
      throw new CustomError({ status: 404, message: "Invalid Credentials" });
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserExists.password!
    );
    if (!isPasswordMatched) {
      throw new CustomError({ status: 401, message: "Invalid Credentials" });
    }

    const token = generateJwtToken({
      _id: isUserExists._id,
      name: isUserExists.name,
      email: isUserExists.email,
      colorCode: isUserExists.colorCode,
    });

    res.json({
      success: true,
      message: "User logged in successfully",
      data: { token },
    });
  } catch (error) {
    next({ message: "Error Logging In" });
  }
};
