import z from "zod";

export interface CreateCommentInputDTO {
  post_id: string;
  text: string;
  token: string;
}

export type CreateCommentOutputDTO = undefined;

export const CreateCommentSchema = z
  .object({
    text: z.string().min(1),
    token: z.string().min(1),
    post_id: z.string().min(1),
  })
  .transform((data) => data as CreateCommentInputDTO);
