import z from "zod";

export interface CreateCommentInputDTO {
  user_id: string;
  post_id: string;
  text: string;
  token: string;
}

export type CreatePostOutputDTO = undefined;

export const CreatePostSchema = z.object({
  user_id: z.string().min(1),
  post_id: z.string().min(1),
  text: z.string().min(1),
  token: z.string().min(1),
});
