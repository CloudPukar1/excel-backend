import { Types, Schema, model } from "mongoose";

const GridSchema = new Schema(
  {
    sheetId: {
      type: Types.ObjectId,
      required: true,
      index: true,
    },
    title: {
      default: "Sheet 1",
      type: String,
    },
    color: {
      default: "transparent",
      type: String,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Grid", GridSchema);
