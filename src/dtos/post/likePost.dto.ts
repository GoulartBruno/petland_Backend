import z from "zod";

export interface LLikePostInputDTO {
  postId: string;
  token: string;
  like: boolean;
}

export type LikePostOutputDTO = undefined;

export const LikePostSchema = z.object({
  postId: z.string().min(1),
  token: z.string().min(1),
  like: z.boolean(),
});
