import { Animal } from "@prisma/client";
import { prisma } from "../libs/prisma";
import { CreateAnimalDTO } from "../validations/animals/create.validations";

export class AnimalService {
  public async save(data: CreateAnimalDTO): Promise<Animal> {
    const animal = await prisma.animal.create({
      data,
    });

    return animal;
  }

  public async findAll(): Promise<Animal[]> {
    const animals = await prisma.animal.findMany();

    return animals;
  }
}
