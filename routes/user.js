import express from "express";
import { uploadUserController, userLoginController } from "../controllers/user.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/", userLoginController);
router.post("/upload", upload.single("photo"), uploadUserController);

export default router;