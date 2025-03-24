import express from "express";

import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser
} from "../controllers/user.controller";

const router = express.Router();

router.route("/")
  .post(createUser)
  .get(getUsers)

router.route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;
