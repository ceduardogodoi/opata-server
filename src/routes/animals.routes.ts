import { StatusCodes } from "http-status-codes";
import { koaBody } from "koa-body";
import Router from "@koa/router";
import { AnimalService } from "../services/animals.service";
import { createAnimalSchema } from "../validations/animals/create.validations";
import { validate } from "../middlewares/validate.middleware";
import { Routes } from "./routes";

const animalService = new AnimalService();

export const animalsRouter = new Router({
  prefix: Routes.animals.PREFIX,
});

animalsRouter.get(Routes.animals.ROOT, async (ctx) => {
  const animals = await animalService.findAll();

  ctx.body = animals;
});

animalsRouter.post(
  Routes.animals.ROOT,
  koaBody(),
  validate(createAnimalSchema),
  async (ctx) => {
    const animal = await animalService.save(ctx.request.body);

    ctx.status = StatusCodes.CREATED;
    ctx.body = animal;
  }
);
