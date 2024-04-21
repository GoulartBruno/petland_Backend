import express from "express";
import { CommentController } from "../controller/CommentController";
import { CommentBusiness } from "../business/CommentBusiness";
import { CommentDatabase } from "../database/CommentDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { postRouter } from "./postRouter";

export const commentRouter = express.Router();

const commentController = new CommentController(
  new CommentBusiness(
    new CommentDatabase(),
    new IdGenerator(),
    new TokenManager()
  )
);

postRouter.post("/:postId/comments", commentController.createComment);
commentRouter.get("/", commentController.getComments);
commentRouter.put("/:id", commentController.editComment);
