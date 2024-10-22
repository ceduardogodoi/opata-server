import { z } from "zod";

export const SignOutParamsSchema = z
  .object({
    accessToken: z
      .string({ required_error: "acessToken is required." })
      .min(1, "acessToken is required."),
  })
  .strip();

export type SignOutParams = z.infer<typeof SignOutParamsSchema>;
