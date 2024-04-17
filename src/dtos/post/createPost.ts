import z from "zod";

export interface CreatePostInputDTO {
  text: string;
  image: string;
  token: string;
}

export type CreatePostOutputDTO = undefined;

export const CreatePostSchema = z
  .object({
    text: z.string().min(1),
    image: z.string().min(1),
    token: z.string().min(1),
  })
  .transform((data) => data as CreatePostInputDTO);
