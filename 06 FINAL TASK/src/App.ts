import dotenv from "dotenv";
dotenv.config();
import express, { Response, Request } from "express";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userController";
import authRouter from "./Routes/authRouter";
import adminRouter from "./Routes/adminRoutes";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("server is alive");
});
app.use("/", authRouter);
app.use("/task", userRouter);
app.use("/dashboard", adminRouter);
app.listen(port, () => {
  console.log(`server is listing to port number ${port}`);
});
