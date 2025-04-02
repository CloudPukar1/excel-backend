import { colors } from "./constants";

export const generateRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
