import { z } from 'zod'

const envSchema = z.object({
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_PORT: z.string().transform(Number),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
