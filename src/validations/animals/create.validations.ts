import { z } from 'zod'

export const createAnimalSchema = z.object({
  name: z.string({ message: 'Nome é obrigatório' }),
  age: z.number({ message: 'Idade é obrigatório' }),
  history: z.string().optional().nullable(),
  images: z.string().array().default([]),
})

export type CreateAnimalDTO = z.infer<typeof createAnimalSchema>
