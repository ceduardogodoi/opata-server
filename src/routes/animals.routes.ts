import { StatusCodes } from 'http-status-codes'
import { koaBody } from 'koa-body'
import Router from '@koa/router'

import { saveAnimal, findAllAnimals } from '../services/animals.service'
import { createAnimalSchema } from '../validations/animals/create.validations'
import { validate } from '../middlewares/validate.middleware'

export const animalsRouter = new Router({
  prefix: '/animals',
})

animalsRouter.get('/', async (ctx) => {
  const animals = await findAllAnimals()

  ctx.body = animals
})

animalsRouter.post(
  '/',
  koaBody(),
  validate(createAnimalSchema),
  async (ctx) => {
    const animal = await saveAnimal(ctx.request.body)

    ctx.status = StatusCodes.CREATED
    ctx.body = animal
  }
)
