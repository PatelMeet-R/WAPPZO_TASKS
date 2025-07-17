import cookieToken from "../Utils/CookieToken";
import { Request, Response } from "express";
import prisma from "../../prisma";

import {
  BodyResponse,
  Signupbody,
  LoginBody,
  user,
} from "../Interfaces/UserInterface";
import { error, log } from "console";

const signup = async (
  req: Request<{}, {}, Signupbody>,
  res: BodyResponse
): Promise<void> => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json("user must filled the data");
    }
    console.log(name + email + "pass here ::" + password);
    const NewUser: Signupbody = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    cookieToken(NewUser as user, res);
    log(NewUser + "this is database inserted data");
  } catch (error) {
    log("the error is catching at signup userController" + error);
  }
};
const login = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
): Promise<void> => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)

        .json("failed for not filling the details at login");
    }
    const LogUser: LoginBody | null = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!LogUser) {
      res.status(404).json("User not found");
    } else if (LogUser.password !== password) {
      res.status(400).json("Password is not matching");
    } else {
      cookieToken(LogUser as user, res);
    }
  } catch (error) {
    log("this error is cause at the Login userController", error);
  }
};
const Logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const token: string | null = req.cookies.token;
    if (!token) {
      res.status(400).json("Token is not Found");
      log("Token is not Found");
    }
    res.status(200).clearCookie("token", { httpOnly: true });
  } catch (error) {
    log("this error is cause at the Login userController", error);
  }
};
export { signup, login, Logout };
