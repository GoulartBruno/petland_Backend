import z from "zod";

export interface LikePostInputDTO {
  postId: string;
  token: string;
  like: boolean;
}

export type LikePostOutputDTO = undefined;

export const LikePostSchema = z
  .object({
    postId: z.string().min(1),
    token: z.string().min(1),
    like: z.boolean(),
  })
  .transform((data) => data as LikePostInputDTO);
