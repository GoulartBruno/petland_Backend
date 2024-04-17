import z from "zod";

export interface SignupInputDTO {
  userName: string;
  email: string;
  password: string;
}

export interface SignupOutputDTO {
  token: string;
}

export const SignupSchema = z
  .object({
    userName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  })
  .transform((data) => data as SignupInputDTO);
