import { NextFunction, Request, Response } from "express";
import Sheet from "../models/sheet.model";
import { asyncHandler, CustomError } from "../lib/utils";
import Grid from "../models/grid.model";

export const createSheet = asyncHandler(async (req, res) => {
  let sheet = await Sheet.create({
    createdBy: req.user._id,
  });

  const grid = await Grid.create({
    createdBy: req.user._id,
    sheetId: sheet._id,
  });

  const newSheet = await Sheet.findByIdAndUpdate(
    sheet._id,
    { $push: { grids: grid._id } },
    { new: true }
  );

  res.status(201).json({
    success: true,
    message: "Sheet created successfully",
    data: newSheet,
  });
});

export const getSheets = asyncHandler(async (req, res) => {
  const { page = 1, search = "", limit = 20 } = req.query;
  const { _id: userId } = req.user;

  const matchQuery = {
    createdBy: userId,
    title: { $regex: search, $options: "i" },
  };

  const sheets = await Sheet.find(
    matchQuery,
    { createdBy: 0 },
    {
      sort: {
        createdAt: 1,
      },
      limit: +limit,
      skip: (+page - 1) * +limit,
    }
  );

  const count = (await Sheet.find(matchQuery)).length;

  const pageMeta = {
    totalPages: Math.ceil(count / +limit),
    total: count,
    page: +page,
  };
  res.json({
    success: true,
    message: "Sheet data fetched successfully",
    data: { sheets, pageMeta },
  });
});

export const getSheet = asyncHandler(async (req, res) => {
  const sheet = await Sheet.findById(req.params.sheetId, {
    grids: 1,
    title: 1,
    createdBy: 1,
  }).populate({
    path: "grids",
    select: { title: 1, color: 1, sheetId: 1 },
  });

  if (!sheet) {
    throw new CustomError({ status: 404, message: "Sheet not found" });
  }

  if (sheet.createdBy.toString() !== req.user._id) {
    throw new CustomError({
      message: "You don't have access to view and edit this document",
      status: 400,
    });
  }
  res.json({
    success: true,
    message: "Sheet data fetched successfully",
    data: {
      _id: sheet._id,
      title: sheet.title,
      grids: sheet.grids,
    },
  });
});

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
      next({ status: 404, message: "Sheet not found" });
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
    next({ message: "Error deleting sheet" });
  }
};
