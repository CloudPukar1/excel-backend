import express from "express";

import {
  createGrid,
  deleteGrid,
  getGrid,
  updateGrid,
} from "../controllers/grid.controller";

const router = express.Router();

router.route("/").post(createGrid);

router.route("/:gridId").get(getGrid).put(updateGrid).delete(deleteGrid);

export default router;
