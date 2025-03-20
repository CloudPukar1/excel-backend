import { Request, Response } from "express";

export const createSheet = () => {};

export const getSheets = () => {};

export const getSheet = (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Sheet data fetched successfully",
    data: [
      ["12", "abc", "16"],
      ["15", "12", "!@$#"],
      ["15", "12", "!@$#", ""],
    ],
  });
};

export const updateSheet = () => {};

export const deleteSheet = () => {};
