import express from "express";

import { loginUser } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", loginUser);
// router.post("/reset-password", resetUserPassword);
// router.post("/activate", activateUser);
// router.post("/forgot-password", forgotUserPassword);
// router.post("/change-password", changeUserPassword);

export default router;
