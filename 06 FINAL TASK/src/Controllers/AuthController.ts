import express, { Response, Request } from "express";
import { cookieToken, clearCookieToken } from "../Utils/cookieToken";
import { verifyPassword, genHashPass } from "../Utils/bcyptHash";

import { loginBody, SignBody, userID } from "../Interfaces/userInterface";
import prisma from "../../prisma";

const signUpController = async (
  req: Request<{}, {}, SignBody>,
  res: Response
): Promise<void> => {
  let { email, name, password, department } = req.body;
  if (!name || !email || !password || !department) {
    res.status(401).send("user must filled all fields");
    return;
  }
  try {
    const existUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    // if (existUser) {
    //   if (existUser?.logStatus === "reject") {
    //     res.status(200).send("Your are reject");
    //     return;
    //   } else if (existUser?.logStatus === "accepted") {
    //     res.status(200).send("Your are approve so get login");
    //     return;
    //   } else {
    //     // if (existUser?.logStatus === "pending")
    //     res
    //       .status(200)
    //       .send("User is Signup once so wait for LogStatus approval");
    //     return;
    //   }
    // }
    if (existUser) {
      switch (existUser.logStatus) {
        case "reject":
          res.status(403).send("You have been rejected");
          break;
        case "accepted":
          res.status(200).send("You are approved. Please log in.");
          break;
        default:
          res
            .status(200)
            .send("You have already signed up. Please wait for approval.");
      }
      return;
    }

    if (!existUser) {
      const { isValid, hashPass } = await genHashPass(password);
      if (!isValid || !hashPass) {
        res.status(500).send("Password hashing failed,signup again");
        return;
      }
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          department,
          password: hashPass,
        },
      });

      res.status(200).json({
        message: "your signup process is complete now wait for admin approval",
        user: newUser,
      });

      return;
    }
  } catch (error) {
    console.log("this error caught at the signController", error);
  }
};

const loginController = async (
  req: Request<{}, {}, loginBody>,
  res: Response
): Promise<void> => {
  let { email, password: inputPass } = req.body;
  try {
    if (!email || !inputPass) {
      res.status(400).send("user must filled the details of field");
      return;
    }
    const existUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!existUser) {
      res.status(404).send("User not found");
      return;
    }
    const { password: DbPass } = existUser;
    const isMatch = await verifyPassword(inputPass, DbPass as string);

    if (!isMatch) {
      res.status(401).send("Invalid credentials");
      return;
    }
    if (existUser?.logStatus === "pending") {
      res.status(200).send("Please wait for Your Approval");
      return;
    } else if (existUser?.logStatus === "reject") {
      res
        .status(400)
        .send("You are not applicable , admin rejected your approval");
      return;
    } else {
      // accepted
      cookieToken(existUser as userID, res);
      console.log("login successful", existUser);
      // res.status(200).json({ message: "login successful", existUser });
      // return;
    }
  } catch (error) {
    console.log("the error at loginController ", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Something went wrong during login" });
      return;
    }
  }
};

const logoutController = async (req: Request, res: Response): Promise<void> => {
  try {
    clearCookieToken(res);
    res.status(200).json({ message: "you just logout" });
  } catch (error) {
    res.status(400).json({ message: "error while logout" });
    console.log("error while logout", error);
  }
};

export { signUpController, loginController, logoutController };
