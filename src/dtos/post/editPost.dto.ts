import z, { date } from "zod";

export interface EditPostInputDTO {
  text: string;
  token: string;
  idToEdit: string;
}

export type EditPostOutputDTO = undefined;

export const EditPostSchema = z
  .object({
    text: z.string().optional(),
    token: z.string().min(1),
    idToEdit: z.string().min(1),
  })
  .transform((data) => data as EditPostInputDTO);
