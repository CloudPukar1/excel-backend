import express from "express";

import { removeRow, removeColumn } from "../controllers/cell.controller";

const router = express.Router();

router.post("/:gridId/:rowId/row", removeRow);
router.post("/:gridId/:columnId/column", removeColumn);

export default router;
