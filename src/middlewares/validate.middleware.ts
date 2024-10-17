import type { Context, Next } from "koa";
import type { AnyZodObject } from "zod";
import { StatusCodes } from "http-status-codes";
import { FormValidationException } from "../models/exceptions/form-validation.exception";

export function validate(schema: AnyZodObject) {
  return async function (ctx: Context, next: Next) {
    const result = schema.safeParse(ctx.request.body);

    if (result.error != null) {
      const error = new FormValidationException()
        .setInstance(ctx.request.url)
        .setExtensions(result.error.flatten().fieldErrors)
        .build();

      ctx.status = StatusCodes.BAD_REQUEST;
      ctx.body = error;
      ctx.set("Content-Type", "application/problem+json charset=utf-8");

      return;
    }

    await next();
  };
}
