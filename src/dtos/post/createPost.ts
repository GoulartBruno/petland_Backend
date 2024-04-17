import z from "zod";

export interface CreatePostInputDTO {
  text: string;
  image: string;
  token: string;
}

export type CreatePostOutputDTO = undefined;

export const CreatePostSchema = z.object({
  text: z.string().optional(),
  image: z.string(),
  token: z.string().min(1),
});
