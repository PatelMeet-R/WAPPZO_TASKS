import express, { Router } from "express";
const router = express.Router();

import {
  AllPost,
  CreatePost,
  deletePost,
  fetchAllUserPost,
  updatePost,
} from "../Controllers/PostController";
router.route("/").get(AllPost);
router
  .route("/:id")
  .post(CreatePost)
  .put(updatePost)
  .get(fetchAllUserPost)
  .delete(deletePost);

export default router;
