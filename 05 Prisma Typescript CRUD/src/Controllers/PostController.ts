import prisma from "../../prisma";
import { Response, Request } from "express";
import { PostBody, UpdatePostBody } from "../Interfaces/UserInterface";
import { findUserById } from "../Helpers/ValidateUser";

const CreatePost = async (
  req: Request<{ id: string }, {}, PostBody>,
  res: Response
): Promise<void> => {
  const Token: string | null = req.cookies.token;
  if (!Token) {
    res
      .status(400)
      .json(" Token not found user Must be Login before create post");
    console.log(
      "this is happing because user doesn't have token user must login/signup before create post  "
    );
  }
  const userId = req.params.id;
  const UserInfo = await findUserById(userId);
  if (!UserInfo) {
    res
      .status(404)
      .json("user not found in database. please signup before create any post");
    return;
  }
  let { postDescription, postTitle } = req.body;
  const PostCreated = await prisma.post.create({
    data: {
      postDescription,
      postTitle,
      userId: UserInfo.id,
    },
  });
  res.status(200).json(`PostCreated ${PostCreated}`);
};
const updatePost = async (
  req: Request<{ id: string }, {}, UpdatePostBody>,
  res: Response
) => {
  const Token: string | null = req.cookies.token;
  if (!Token) {
    res
      .status(400)
      .json(" Token not found user Must be Login before create post");
    console.log(
      "this is happing because user doesn't have token user must login/signup before create post  "
    );
  }
  let { postTitle, postDescription } = req.body;
  const userId = req.params.id;
  const existingPost = await prisma.post.findFirst({
    where: { userId },
  });
  if (!existingPost) {
    return res.status(404).json({ message: "Post not found for user" });
  }
  const PostUpdated = await prisma.post.update({
    where: { id: existingPost.id },
    data: {
      ...(postTitle && { postTitle }),
      ...(postDescription && { postDescription }),
    },
  });
  console.log("Post Updated succefully");
  res.status(200).json("Post Updated succefully");
};
const deletePost = async (
  req: Request<{ postId: string }, {}, {}>,
  res: Response
): Promise<void> => {
  const Token: string | null = req.cookies.token;
  if (!Token) {
    res
      .status(400)
      .json(" Token not found user Must be Login before create post");
    console.log(
      "this is happing because user doesn't have token user must login/signup before create post  "
    );
  }
  const Pid = req.params.postId;
  const DestroyPost = await prisma.post.delete({
    where: {
      id: Pid,
    },
  });
  res.status(200).send("post deleted Succefully");
  console.log("post deleted Succefully");
};

const fetchAllUserPost = async (
  req: Request<{ id: string }, {}, PostBody>,
  res: Response
) => {
  const Token: string | null = req.cookies.token;
  if (!Token) {
    res.status(400).json(" Token not found user Must be Login before see post");
    console.log(
      "this is happing because user doesn't have token user must login/signup before see post  "
    );
  }
  const id = req.params.id;
  const Posts = await prisma.post.findMany({
    where: {
      userId: id,
    },
  });
  console.log(Posts + "this is post of " + id + "user");
  res.status(200).send(Posts);
};
const AllPost = async (
  req: Request<{ id: string }, {}, PostBody>,
  res: Response
) => {
  const Token: string | null = req.cookies.token;
  if (!Token) {
    res.status(400).json(" Token not found user Must be Login before see post");
    console.log(
      "this is happing because user doesn't have token user must login/signup before see post  "
    );
  }
  const Posts = await prisma.post.findMany({});
  console.log(Posts);
  res.status(200).send(Posts);
};
export { CreatePost, updatePost, deletePost, fetchAllUserPost, AllPost };
