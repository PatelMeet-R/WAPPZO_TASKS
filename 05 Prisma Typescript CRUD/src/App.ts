import dotenv from "dotenv";
dotenv.config();
import { log } from "console";
import express from "express";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let port = process.env.PORT || 8000;

import userRouter from "./Routers/UserRouter";
import postRouter from "./Routers/PostRouter";



// app.get("/", (req: Request, res: Response) => {
//   res.status(200).send("'/'  api is working fine");
// });
app.use("/", userRouter);
app.use("/post", postRouter);

app.listen(port, () => {
  log(`server is running on the port number ${port} `);
});
