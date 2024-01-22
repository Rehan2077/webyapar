import express from "express";
import {
  adminLoginController,
  createUserController,
  deleteUserController,
  verifyUserController,
  viewUsersController,
} from "../controllers/admin.js";

const router = express.Router();

router.post("/", adminLoginController);
router.post("/create", createUserController);
router.get("/viewusers", viewUsersController);

router.patch("/verify/:userid", verifyUserController);

router.delete("/delete/:userid", deleteUserController);

export default router;
