import { z } from "zod";

export const confirmSignUpParamsSchema = z
  .object({
    email: z.string().email(),
    confirmationCode: z.string(),
  })
  .strip();

export type ConfirmSignUpParams = z.infer<typeof confirmSignUpParamsSchema>;
