import { z } from "zod";

export const authenticationParamsSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strip();

export type AuthenticationParams = z.infer<typeof authenticationParamsSchema>;
