import express from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import sheetRoutes from "./sheet.routes";
import { verifyToken } from "../middlewares/verify-token.middleware";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/sheet", verifyToken, sheetRoutes);

export default router;
