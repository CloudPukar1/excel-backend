import { asyncHandler, CustomError } from "../lib/utils";
import Cell from "../models/cell.model";
import Grid from "../models/grid.model";

export const removeRow = asyncHandler(async (req, res) => {
  const { rowId, gridId } = req.params;

  const grid = await Grid.findById(gridId);

  if (!grid) {
    throw new CustomError({ message: "Grid not exist", status: 400 });
  }

  await Cell.deleteMany({ gridId, rowId });

  res.json({
    message: "Row has been deleted successfully",
  });
});

export const removeColumn = asyncHandler(async (req, res) => {
  const { gridId, columnId } = req.params;

  const grid = await Grid.findById(gridId);

  if (!grid) {
    throw new CustomError({ message: "Grid not exist", status: 400 });
  }

  await Cell.deleteMany({ gridId, columnId });

  res.json({
    message: "Column has been deleted successfully",
  });
});
