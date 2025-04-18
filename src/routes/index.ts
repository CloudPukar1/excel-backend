import express from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import sheetRoutes from "./sheet.routes";
import gridRoutes from "./grid.routes";
import cellRoutes from "./cell.routes";

import { verifyToken } from "../middlewares/verify-token.middleware";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/sheet", verifyToken, sheetRoutes);
router.use("/grid", verifyToken, gridRoutes);
router.use("/cell", verifyToken, cellRoutes);

export default router;
