import { Context } from 'koa'
import { AnyZodObject } from 'zod'
import { ProblemDetailError } from '../models/ProblemDetailError'

export function validate(schema: AnyZodObject) {
  return function (ctx: Context) {
    const result = schema.safeParse(ctx.request.body)

    if (!result.success) {
      const error = new ProblemDetailError({
        instance: 'https://example.com',
      })
      
      ctx.status = error.status
      ctx.body = error
    }
  }
}

