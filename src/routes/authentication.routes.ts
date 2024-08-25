import Router from "@koa/router";
import { StatusCodes } from "http-status-codes";
import { AuthenticationService } from "../services/authentication.service";
import { validate } from "../middlewares/validate.middleware";
import { koaBody } from "koa-body";
import { authenticationParamsSchema } from "../validations/authentication/sign-in.validation";

export const authenticationRouter = new Router();

const authenticationService = new AuthenticationService();

authenticationRouter.post(
  "/sign-in",
  koaBody(),
  validate(authenticationParamsSchema),
  async (ctx) => {
    const credentials = authenticationParamsSchema.parse(ctx.request.body);

    await authenticationService.signIn(credentials);

    ctx.status = StatusCodes.OK;
  }
);
