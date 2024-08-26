import { z } from "zod";

export const signInParamsSchema = z
  .object({
    email: z.string().email({ message: "Formato de e-mail inválido." }),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres."),
  })
  .strip();

export type SignInParams = z.infer<typeof signInParamsSchema>;
