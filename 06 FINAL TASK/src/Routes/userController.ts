import {
  displayTask,
  setAssignmentStatus,
} from "../Controllers/userController";
import { isUser } from "../Middlewares/Middleware";
import { isAuthenticated } from "../Middlewares/ValidateJwt";
import express, { Router } from "express";
const router = express.Router();

router.route("/").get(isAuthenticated, isUser, displayTask);
router.route("/:TaskId").post(isAuthenticated, isUser, setAssignmentStatus);

export default router;
