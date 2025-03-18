import express from "express";

import sheetRoutes from "./sheet.routes";

const router = express.Router();

// router.use("/auth", authRoutes);
router.use("/sheet", sheetRoutes);


export default router;