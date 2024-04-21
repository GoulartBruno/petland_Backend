import { Request, Response } from "express";
import { ZodError } from "zod";
import { CommentBusiness } from "../business/CommentBusiness";
import { CreateCommentSchema } from "../dtos/comment/createComment.dto";
import { BaseError } from "../errors/BaseError";
import { GetCommentSchema } from "../dtos/comment/getComment.dto";
import { EditCommentSchema } from "../dtos/comment/editComment.dto";

export class CommentController {
  constructor(private commentBusiness: CommentBusiness) {}

  public createComment = async (req: Request, res: Response) => {
    try {
      const input = CreateCommentSchema.parse({
        text: req.body.text,
        token: req.headers.authorization,
        post_id: req.params.postId,
      });

      const output = await this.commentBusiness.createComment(input);

      res.status(201).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Unexpected Error");
      }
    }
  };

  public getComments = async (req: Request, res: Response) => {
    try {
      const input = GetCommentSchema.parse({
        token: req.headers.authorization,
      });

      const output = await this.commentBusiness.getComments(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Unexpected Error");
      }
    }
  };

  public editComment = async (req: Request, res: Response) => {
    try {
      const input = EditCommentSchema.parse({
        text: req.body.text,
        token: req.headers.authorization,
        idToEdit: req.params.id,
      });

      const output = await this.commentBusiness.editComment(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Unexpected Error");
      }
    }
  };
}
