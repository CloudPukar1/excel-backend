import { asyncHandler, CustomError } from "../lib/utils";

import Sheet from "../models/sheet.model";
import Cell from "../models/cell.model";
import Row from "../models/row.model";
import Column from "../models/column.model";
import Grid from "../models/grid.model";

export const createGrid = asyncHandler(async (req, res) => {
  const { sheetId } = req.body;

  const sheet = await Sheet.findById(sheetId);

  if (!sheet) {
    throw new CustomError({ message: "Sheet does not exist", status: 400 });
  }

  const grid = await Grid.create({
    sheetId,
    title: `Sheet${sheet.grids.length + 1}`, // TODO: create sheet if not created otherwise keep on incresing the number
    createdBy: req.user._id,
  });

  await Sheet.findByIdAndUpdate(sheetId, { $push: { grids: grid._id } });

  res.status(201).json({
    success: true,
    message: "Grid created successfully",
    data: {
      _id: grid._id,
      title: grid.title,
      sheetId: grid.sheetId,
      color: grid.color,
    },
  });
});

export const getGrid = asyncHandler(async (req, res) => {
  const { gridId } = req.params;

  const grid = await Grid.findById(gridId, {
    title: 1,
    sheetId: 1,
    color: 1,
  });

  if (!grid) {
    throw new CustomError({ status: 404, message: "Grid does not exist" });
  }

  const rows = await Row.find({ gridId });
  const columns = await Column.find({ gridId });
  const cells = await Cell.find(
    { gridId },
    { createdAt: 0, updatedAt: 0, __v: 0 }
  );

  res.json({
    success: true,
    message: "Grid data fetched successfully",
    data: {
      grid: {
        _id: grid._id,
        color: grid.color,
        title: grid.title,
        sheetId: grid.sheetId,
      },
      rows,
      columns,
      cells,
    },
  });
});

export const updateGrid = asyncHandler(async (req, res) => {
  const { gridId } = req.params;

  const grid = await Grid.findById(gridId);

  if (!grid) {
    throw new CustomError({ status: 400, message: "Grid not exist" });
  }

  await Grid.findByIdAndUpdate(gridId, { $set: req.body });
  res.status(200).json({ message: "Grid has been updated successfully" });
});

export const deleteGrid = asyncHandler(async (req, res) => {
  const { gridId } = req.params;

  const grid = await Grid.findById(gridId);
  if (!grid) {
    throw new CustomError({ status: 404, message: "Grid not found" });
  }

  const sheet = await Sheet.findById(grid.sheetId);
  if (!sheet) {
    throw new CustomError({ status: 404, message: "Sheet not found" });
  }

  await Cell.deleteMany({ gridId });
  await Row.deleteMany({ gridId });
  await Column.deleteMany({ gridId });
  await Grid.findByIdAndDelete(gridId);

  if (sheet.grids.length === 1) {
    await Sheet.findByIdAndDelete(grid.sheetId);
  } else {
    await Sheet.findByIdAndUpdate(grid.sheetId, { $pull: { grids: gridId } });
  }

  res.json({
    success: true,
    message: "Grid deleted successfully",
  });
});
