import express from "express";

import * as sheetController from "../controllers/sheet.controller";

const router = express.Router();

router
  .route("/")
  .post(sheetController.createSheet)
  .get(sheetController.getSheets);

router
  .route("/:id")
  .get(sheetController.getSheet)
  .put(sheetController.updateSheet)
  .delete(sheetController.deleteSheet);

export default router;
