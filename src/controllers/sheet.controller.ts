import { NextFunction, Request, Response } from "express";
import Sheet from "../models/sheet.model";

export const createSheet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, userId, data } = req.body;

    const sheet = new Sheet({
      name,
      userId,
      data,
    });
    await sheet.save();
    res.status(201).json({
      success: true,
      message: "Sheet created successfully",
      data: sheet,
    });
  } catch (error) {
    next({ message: "Error Creating sheet" });
  }
};

export const getSheets = () => {};

export const getSheet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sheet = await Sheet.findById(req.params.id);
    if (sheet) {
      next({ status: 404, message: "Sheet not found" });
    }
    res.json({
      success: true,
      message: "Sheet data fetched successfully",
      data: sheet,
    });
  } catch (error) {
    next({ message: "Error fetching sheet" });
  }
};

export const updateSheet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data } = req.body;

    const sheet = await Sheet.findByIdAndUpdate(
      req.params.id,
      { data, updatedAt: Date.now() },
      { new: true }
    );

    if (!sheet) {
      return next({ status: 404, message: "Sheet not found" });
    }

    res.json({
      success: true,
      message: "Sheet data fetched successfully",
      data: sheet,
    });
  } catch (error) {
    next({ message: "Error updating sheet" });
  }
};

export const deleteSheet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sheet = await Sheet.findByIdAndDelete(req.params.id);

    if (!sheet) {
      return next({ status: 404, message: "Sheet not found" });
    }

    res.json({
      success: true,
      message: "Sheet deleted successfully",
    });
  } catch (error) {
    next({ message: "Error updating sheet" });
  }
};
