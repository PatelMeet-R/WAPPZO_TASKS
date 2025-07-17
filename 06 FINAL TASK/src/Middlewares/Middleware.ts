import { Response, Request, NextFunction } from "express";
import prisma from "../../prisma";
import { Role, userID } from "../Interfaces/userInterface";

const fetchUser = async (userId: userID) => {
  try {
    return await prisma.user.findUnique({ where: { id: userId.id } });
  } catch (error) {
    console.log(
      "this is the error cause at the middleware for the Fetch user",
      error
    );
  }
};
const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = res.locals.user?.id;
  try {
    if (!userId) {
      res.status(400).send("access denied !! unauthorized user");
      return;
    }
    const validUser = await fetchUser({ id: userId });
    if (!validUser) {
      res.status(404).send("user Not Found");
      return;
    }
    if (validUser.role !== "ADMIN") {
      res.status(403).send("Access denied: Admins only");
      return;
    }
    next();
  } catch (error) {
    console.log("isAdmin validation error", error);
  }
};
const isUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = res.locals.user?.id;
  try {
    if (!userId) {
      res.status(400).send("access denied !! unauthorized user");
      return;
    }
    const validUser = await fetchUser({ id: userId });
    if (!validUser) {
      res.status(404).send("user Not Found");
      return;
    }
    if (validUser.role !== "USER") {
      res.status(403).send("Access denied: User only");
      return;
    }
    next();
  } catch (error) {
    console.log("isUser validation error", error);
  }
};

export { fetchUser, isUser, isAdmin };
