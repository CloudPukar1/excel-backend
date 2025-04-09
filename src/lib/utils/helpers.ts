import { sign } from "jsonwebtoken";
import { colors } from "./constants";

export const generateRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateJwtToken = (payload: string | object) => {
  return sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "5d",
  });
};
