import { Animal } from '@prisma/client';

import { prisma } from '../libs/prisma'
import { CreateAnimalDTO } from '../validations/animals/create.validations';

export async function saveAnimal(payload: CreateAnimalDTO): Promise<Animal> {
  const animal = await prisma.animal.create({
    data: payload,
  })

  return animal
}

export async function findAllAnimals(): Promise<Animal[]> {
  const animals = await prisma.animal.findMany()

  return animals
}
