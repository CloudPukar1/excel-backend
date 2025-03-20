import express from "express";

import {
  createSheet,
  deleteSheet,
  getSheet,
  getSheets,
  updateSheet,
} from "../controllers/sheet.controller";

const router = express.Router();

router.route("/").post(createSheet).get(getSheets);

router
  .route("/:id")
  .get(getSheet)
  // .put(updateSheet)
  .delete(deleteSheet);

export default router;
