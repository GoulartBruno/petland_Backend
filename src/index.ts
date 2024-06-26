import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./router/userRouter";
import { postRouter } from "./router/postRouter";
import { followerRouter } from "./router/followerRouter";
import { commentRouter } from "./router/commentRouter";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(Number(process.env.PORT) || 3003, () => {
  console.log(`Server running on port ${Number(process.env.PORT) || 3003}`);
});

app.get("/ping", (req, res) => {
  res.send("Pong!");
});

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/followers", followerRouter);
app.use("/comments", commentRouter);
