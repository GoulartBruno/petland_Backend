import z from "zod";

export interface EditPostInputDTO {
  text: string;
  image: string;
  token: string;
  idToEdit: string;
}

export type EditPostOutputDTO = undefined;

export const EditPostSchema = z.object({
  text: z.string().optional(),
  image: z.string(),
  token: z.string().min(1),
  idToEdit: z.string().min(1),
});
