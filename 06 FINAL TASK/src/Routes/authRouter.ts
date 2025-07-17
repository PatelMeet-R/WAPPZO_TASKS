import express, { Router } from "express";
const router = express.Router();
import {
  signUpController,
  loginController,
  logoutController,
} from "../Controllers/AuthController";

router.route("/signup").post(signUpController);
router.route("/login").post(loginController);
router.route("/logout").post(logoutController);

export default router;
