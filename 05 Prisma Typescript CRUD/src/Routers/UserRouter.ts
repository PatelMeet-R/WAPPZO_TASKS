import express, { Router } from "express";
const router = express.Router();
import { login, Logout, signup } from "../Controllers/UserController";


router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(Logout);





export default router;
