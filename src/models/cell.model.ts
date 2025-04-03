import { model, Schema } from "mongoose";

const CellSchema = new Schema(
  {
    gridId: {
      required: true,
      index: true,
      type: Schema.Types.ObjectId,
      ref: "Grid",
    },
    rowId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Row",
    },
    columnId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Column",
    },
    background: {
      default: "#ffffff",
      type: String,
    },
    textAlign: {
      default: "left",
      type: String,
    },
    text: {
      default: "",
      type: String,
    },
    content: {
      default: [],
      type: Array,
    },
  },
  { timestamps: true }
);

export default model("Cell", CellSchema);
