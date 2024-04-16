import z from "zod";
import { PostModel } from "../../models/Post";

export interface GetPostInputDTO {
  text: string;
}

export type GetPostOutputDTO = PostModel;

export const GetPostSchema = z.object({
  token: z.string().min(1),
});
