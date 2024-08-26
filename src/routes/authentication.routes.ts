import Router from "@koa/router";
import { StatusCodes } from "http-status-codes";
import { AuthenticationService } from "../services/authentication.service";
import { validate } from "../middlewares/validate.middleware";
import { koaBody } from "koa-body";
import { signInParamsSchema } from "../validations/authentication/sign-in.validation";
import { confirmSignUpParamsSchema } from "../validations/authentication/confirm-sign-up.validation";

export const authenticationRouter = new Router();

const authenticationService = new AuthenticationService();

authenticationRouter.post(
  "/sign-up",
  koaBody(),
  validate(signInParamsSchema),
  async (ctx) => {
    const credentials = signInParamsSchema.parse(ctx.request.body);

    const [error, data] = await authenticationService.signUp(credentials);
    if (error) {
      ctx.status = error.status;
      ctx.body = error;
    } else {
      ctx.status = StatusCodes.OK;
      ctx.body = data;
    }
  }
);

authenticationRouter.post(
  "/sign-up/confirmation",
  koaBody(),
  validate(confirmSignUpParamsSchema),
  async (ctx) => {
    const params = confirmSignUpParamsSchema.parse(ctx.request.body);

    const [error, data] = await authenticationService.confirmSignUp(params);
    if (error) {
      ctx.status = error.status;
      ctx.body = error;
    } else {
      ctx.status = StatusCodes.OK;
      ctx.body = data;
    }
  }
);

authenticationRouter.post(
  "/sign-in",
  koaBody(),
  validate(signInParamsSchema),
  async (ctx) => {
    const credentials = signInParamsSchema.parse(ctx.request.body);

    await authenticationService.signIn(credentials);

    ctx.status = StatusCodes.OK;
  }
);
