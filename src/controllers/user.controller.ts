import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { asyncHandler, CustomError } from "../lib/utils";
import { generateJwtToken } from "../lib/utils/helpers";

export const createUser = asyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body;
  let isUserExists = await User.findOne({ email: email });
  if (isUserExists) {
    throw new CustomError({ status: 400, message: "Email already in use" });
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  const token = generateJwtToken({
    _id: user._id,
    name: user.name,
    email: user.email,
    colorCode: user.colorCode,
  });

  res.json({
    data: { token },
    message: "Registered successfully",
    success: true,
  });
});

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      message: "User data fetched successfully",
      data: users,
    });
  } catch (error) {
    next({ message: "Error fetching users" });
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      next({ status: 404, message: "User not found" });
    }
    res.json({
      success: true,
      message: "User data fetched successfully",
      data: user,
    });
  } catch (error) {
    next({ message: "Error fetching user" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { data, updatedAt: Date.now() },
      { new: true }
    );

    if (!user) {
      next({ status: 404, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User data fetched successfully",
      data: user,
    });
  } catch (error) {
    next({ message: "Error updating user" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next({ message: "Error deleting sheet" });
  }
};
