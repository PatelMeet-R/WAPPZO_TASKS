import { Response, Request, NextFunction, response } from "express";
import prisma from "../../prisma";
import { taskBody } from "../Interfaces/taskInterface";
import { fetchUser } from "../Middlewares/Middleware";

const LogReqList = async (req: Request, res: Response): Promise<void> => {
  try {
    const pendingUser = await prisma.user.findMany({
      where: {
        logStatus: "pending",
      },
    });
    res.status(200).json(pendingUser);
  } catch (error) {
    res.status(400).json({ message: "Fetching pendingUser error", error });
  }
};

const acceptUser = async (
  req: Request<{ userId: string }, {}, {}>,
  res: Response
): Promise<void> => {
  try {
    let userId = req.params.userId;
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        logStatus: "accepted",
      },
    });
    res.status(200).json({ message: "User is accepted" });
    console.log("User is accepted");
  } catch (error) {
    res.status(400).json({ message: "error cause at acceptUser", error });
    console.log("error cause at acceptUser");
  }
};
const rejectUser = async (
  req: Request<{ userId: string }, {}, {}>,
  res: Response
): Promise<void> => {
  try {
    let userId = req.params.userId;
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        logStatus: "reject",
      },
    });
    res.status(200).json({ message: "User is reject" });
    console.log("User is reject");
  } catch (error) {
    res.status(400).json({ message: "error cause at rejectUser", error });
    console.log("error cause at rejectUser");
  }
};
const acceptUserList = async (req: Request, res: Response): Promise<void> => {
  try {
    const acceptedUser = await prisma.user.findMany({
      where: {
        logStatus: "accepted",
      },
    });
    res.status(200).send(acceptedUser);
  } catch (error) {
    res.status(400).json({ message: "Fetching accepted User error", error });
  }
};

const taskAssign = async (
  req: Request<{ userId: string }, {}, taskBody>,
  res: Response
): Promise<void> => {
  const { title, description } = req.body;
  const userId = req.params.userId;
  try {
    if (!title || !description) {
      res
        .status(400)
        .json({ message: "Please fill the field for task assignment" });
      return;
    }
    const validUser = await fetchUser({ id: userId });
    if (!validUser) {
      res.status(404).send("user is not valid to take on task");
      return;
    }
    // const existingUser = await prisma.user.findUnique({
    //   where: { id: userId },
    // });
    // if (!existingUser) {
    //   res.status(404).send("task cannot assign to unAuthorize user");
    //   return;
    // }
    const createTask = await prisma.task.create({
      data: {
        title,
        description,
        userId: userId,
      },
    });
    res.status(200).send(createTask);
    console.log("task is assign is success");
  } catch (error) {
    res.status(400).json(`this is error cause at taskAssign ---- ${error}`);
    console.log(`this is error cause at taskAssign ----${error}, `);
  }
};

const updateTask = async (
  req: Request<{ taskId: string; userId: string }, {}, taskBody>,
  res: Response
): Promise<void> => {
  const { title, description } = req.body;
  const { userId, taskId } = req.params;
  const validUser = await fetchUser({ id: userId });
  if (!validUser) {
    res.status(404).send("user is not valid to take on task");
    return;
  }
  // const existingUser = await prisma.user.findUnique({
  //   where: { id: userId },
  // });
  // if (!existingUser) {
  //   res.status(404).send("task cannot assign to unAuthorize user");
  //   return;
  // }

  if (!title || !description) {
    res
      .status(400)
      .json({ message: "Please fill the field for task assignment" });
    return;
  }
  const userTaskStatus = await prisma.task.findUnique({
    where: {
      TaskId: taskId,
    },
  });
  if (userTaskStatus?.assignStatus !== "completed") {
    const userTaskUpdate = await prisma.task.update({
      where: {
        TaskId: taskId,
      },
      data: {
        title,
        description,
        userId: userId,
      },
    });
    res.status(200).json({ message: "user Task Update successful" });
    return;
  } else {
    res.status(200).json({
      message: ` Task can't Update !! User task already at ${userTaskStatus?.assignStatus} `,
    });
  }
};

export {
  updateTask,
  taskAssign,
  acceptUserList,
  LogReqList,
  acceptUser,
  rejectUser,
};
