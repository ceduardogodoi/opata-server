import { StatusCodes } from "http-status-codes";
import { koaBody } from "koa-body";
import Router from "@koa/router";
import { AnimalService } from "../services/animals.service";
import { CreateAnimalSchema } from "../validations/animals/create.validations";
import { validate } from "../middlewares/validate.middleware";
import { Routes } from "./routes";
import { authenticate } from "../middlewares/authenticate.middleware";

const animalService = new AnimalService();

export const animalsRouter = new Router({
  prefix: Routes.animals.PREFIX,
});

animalsRouter.get(Routes.animals.ROOT, authenticate(), async (ctx) => {
  const animals = await animalService.findAll();

  ctx.body = animals;
});

animalsRouter.post(
  Routes.animals.ROOT,
  koaBody(),
  authenticate(),
  validate(CreateAnimalSchema),
  async (ctx) => {
    const animal = await animalService.save(ctx.request.body);

    ctx.status = StatusCodes.CREATED;
    ctx.body = animal;
  }
);
