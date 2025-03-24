import { NextFunction, Request, Response } from "express";
import User from "../models/sheet.model";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      next({ status: 400, message: "Email already in use" });
    }
    user = new User({ email, password, name });
    user.save();
    res.json({
      success: true,
      message: "New user Created",
      data: user,
    });
  } catch (error) {
    next({ message: "Error Logging In" });
  }
};


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
