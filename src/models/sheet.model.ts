import { Types, Schema, model } from "mongoose";

const SheetSchema = new Schema(
  {
    title: {
      default: "Untitled Spreadsheet",
      type: String,
    },
    grids: {
      type: [Types.ObjectId],
      ref: "Grid",
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastOpenedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Sheet", SheetSchema);
