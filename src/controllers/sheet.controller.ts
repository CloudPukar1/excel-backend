import { NextFunction, Request, Response } from "express";

import { asyncHandler, CustomError } from "../lib/utils";

import Sheet from "../models/sheet.model";
import Cell from "../models/cell.model";
import Row from "../models/row.model";
import Column from "../models/column.model";
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

export const updateSheet = asyncHandler(async (req, res, next) => {
  const { sheetId } = req.params;

  const sheet = await Sheet.findById(sheetId);

  if (!sheet) {
    throw new CustomError({ status: 400, message: "Sheet not exist" });
  }

  await Sheet.findByIdAndUpdate(sheetId, { $set: req.body });
  res.status(200).json({ message: "Sheet has been updated successfully" });
});

export const deleteSheet = asyncHandler(async (req, res, next) => {
  const { sheetId } = req.params;

  const sheet = await Sheet.findById(sheetId);

  if (!sheet) {
    throw new CustomError({ status: 404, message: "Sheet not found" });
  }

  const query = { gridId: { $in: sheet.grids } };

  await Cell.deleteMany(query);
  await Row.deleteMany(query);
  await Column.deleteMany(query);
  await Grid.deleteMany({ _id: { $in: sheet.grids } });
  await Sheet.findByIdAndDelete(sheetId);

  res.json({
    success: true,
    message: "Sheet deleted successfully",
  });
});
