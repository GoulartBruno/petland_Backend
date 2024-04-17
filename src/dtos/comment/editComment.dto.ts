import z from "zod";

export interface EditCommentInputDTO {
  text: string;
  token: string;
  idToEdit: string;
}

export type EditCommentOutputDTO = undefined;

export const EditPostSchema = z.object({
  text: z.string().min(1),
  token: z.string().min(1),
  idToEdit: z.string().min(1),
});
