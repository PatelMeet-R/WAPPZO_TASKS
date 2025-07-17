import express, { Router } from "express";
const router = express.Router({ mergeParams: true });
import {
  taskAssign,
  updateTask,
  acceptUserList,
  LogReqList,
  acceptUser,
  rejectUser,
} from "../Controllers/adminController";
import { isAdmin } from "../Middlewares/Middleware";
import { isAuthenticated } from "../Middlewares/ValidateJwt";

router.route("/").get(isAuthenticated, isAdmin, LogReqList);
router.route("/log").get(isAuthenticated, isAdmin, acceptUserList);
router.route("/:userId/accept").post(isAuthenticated, isAdmin, acceptUser);
router.route("/:userId/reject").post(isAuthenticated, isAdmin, rejectUser);
router.route("/:userId").post(isAuthenticated, isAdmin, taskAssign);

router
  .route("/:userId/task/:taskId")
  .post(isAuthenticated, isAdmin, updateTask);

export default router;
