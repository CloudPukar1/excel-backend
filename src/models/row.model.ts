import { model, Schema } from "mongoose";

const RowSchema = new Schema(
  {
    gridId: {
      required: true,
      index: true,
      type: Schema.Types.ObjectId,
      ref: "Grid",
    },
    rowId: {
      required: true,
      type: Number,
    },
    height: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

export default model("Row", RowSchema);
