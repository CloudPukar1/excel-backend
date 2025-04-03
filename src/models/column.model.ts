import { model, Schema } from "mongoose";

const ColumnSchema = new Schema(
  {
    gridId: {
      required: true,
      index: true,
      type: Schema.Types.ObjectId,
      ref: "Grid",
    },
    columnId: {
      required: true,
      type: Number,
    },
    width: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

export default model("Column", ColumnSchema);
