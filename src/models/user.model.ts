import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { generateRandomColor } from "../lib/utils/helpers";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    colorCode: {
      type: String,
      default: generateRandomColor,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

export default model("User", UserSchema);
