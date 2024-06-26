import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { CreatePostSchema } from "../dtos/post/createPost";
import { GetPostSchema } from "../dtos/post/getPost.dto";
import { DeletePostSchema } from "../dtos/post/deletePost.dto";
import { LikePostSchema } from "../dtos/post/likePost.dto";
import { EditPostSchema } from "../dtos/post/editPost.dto";

export class PostController {
  constructor(private postBusiness: PostBusiness) {}

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = CreatePostSchema.parse({
        text: req.body.text,
        image: req.body.image,
        token: req.headers.authorization,
      });

      const output = await this.postBusiness.createPost(input);

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

  public getPosts = async (req: Request, res: Response) => {
    try {
      const input = GetPostSchema.parse({
        token: req.headers.authorization,
      });

      const output = await this.postBusiness.getPosts(input);

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

  public editPost = async (req: Request, res: Response) => {
    try {
      const input = EditPostSchema.parse({
        text: req.body.text,
        token: req.headers.authorization,
        idToEdit: req.params.id,
      });

      const output = await this.postBusiness.editPost(input);

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

  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = DeletePostSchema.parse({
        token: req.headers.authorization,
        idToDelete: req.params.id,
      });

      const output = await this.postBusiness.deletePost(input);

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

  public likePost = async (req: Request, res: Response) => {
    try {
      const input = LikePostSchema.parse({
        postId: req.params.id,
        token: req.headers.authorization,
        like: req.body.like,
      });

      const output = await this.postBusiness.likePost(input);

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
