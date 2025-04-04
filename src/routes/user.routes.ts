import express from "express";

import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/verify-token.middleware";

const router = express.Router();

router.route("/").post(createUser).get(verifyToken, getUsers);

router
  .route("/:id")
  .get(verifyToken, getUser)
  .put(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);

export default router;
