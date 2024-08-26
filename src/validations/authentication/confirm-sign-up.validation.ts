import { z } from "zod";

export const confirmSignUpParamsSchema = z
  .object({
    email: z.string().email({ message: "Formato de e-mail inválido." }),
    confirmationCode: z
      .string()
      .min(1, "Código deve ter pelo menos 1 caractere."),
  })
  .strip();

export type ConfirmSignUpParams = z.infer<typeof confirmSignUpParamsSchema>;
