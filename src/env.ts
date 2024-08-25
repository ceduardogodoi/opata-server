import { z } from "zod";

const envSchema = z.object({
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_PORT: z.string().transform(Number),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_COGNITO_CLIENT_ID: z.string(),
  AWS_COGNITO_CLIENT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
