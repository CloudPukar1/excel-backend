import express from "express";

// import authRoutes from "./auth.routes";
// import userRoutes from "./user.routes";
import sheetRoutes from "./sheet.routes";

const router = express.Router();

// router.use("/auth", authRoutes);
// router.use("/user", userRoutes);
router.use("/sheet", sheetRoutes);

export default router;
