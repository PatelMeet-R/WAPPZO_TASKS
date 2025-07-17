import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}
const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.cookies.token;
  if (!token) {
    return res.status(404).send("User must login before make any request");
  }
  try {
    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as DecodedToken;

    if (!decoded?.userId) {
      res.status(401).send("Invalid token structure");
      return;
    }

    res.locals.user = { id: decoded.userId };
    // for the useCase
    // const userId = res.locals.user?.id;
    next();
  } catch (error) {
    res.json(401).send("user token is expired ,please Login again");
  }
};
export { isAuthenticated };
