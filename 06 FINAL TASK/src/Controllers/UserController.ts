import prisma from "../../prisma";
import { Response, Request } from "express";

import { Assign } from "../Interfaces/taskInterface";

const displayTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.user?.id;
    const haveTask = await prisma.user.findMany({
      where: {
        id: userId,
      },
      include: { task: true },
    });
    if (haveTask.length === 0) {
      console.log("No tasks assigned to this user.");
      res
        .status(200)
        .json({ message: "task is yet to assign,check out latter" });
      return;
    }
    //   haveTask.forEach((task) => {
    //     console.log(`Title: ${task["title"]}, Status: ${task.['assignStatus']}`);
    //   });

    res.status(200).json({ Message: "you have task ", haveTask });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error cause at fetching the user task details" });
  }
};
const setAssignmentStatus = async (
  req: Request<{ TaskId: string }, {}, { assignStatus: Assign }>,
  res: Response
): Promise<void> => {
  try {
    let { TaskId } = req.params;
    let { assignStatus } = req.body;

    const updateStatus = await prisma.task.update({
      where: {
        TaskId,
      },
      data: {
        assignStatus,
      },
    });
    res.status(200).json({ message: "task status is change complete" });
    console.log("task status is change");
  } catch (error) {
    res.status(400).json({ message: " Error at task status change " });
    console.log("Error at task status change");
  }
};

export { setAssignmentStatus, displayTask };
