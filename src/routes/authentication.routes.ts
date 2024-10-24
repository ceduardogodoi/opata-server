import Router from "@koa/router";
import { StatusCodes } from "http-status-codes";
import { AuthenticationService } from "../services/authentication.service";
import { validate } from "../middlewares/validate.middleware";
import { koaBody } from "koa-body";
import { SignInParamsSchema } from "../validations/authentication/sign-in.validation";
import { confirmSignUpParamsSchema } from "../validations/authentication/confirm-sign-up.validation";
import { SignOutParamsSchema } from "../validations/authentication/sign-out.validation";
import { Routes } from "./routes";

export const authenticationRouter = new Router({
  prefix: Routes.auth.PREFIX,
});

const authenticationService = new AuthenticationService();

authenticationRouter.post(
  Routes.auth.SIGN_UP,
  koaBody(),
  validate(SignInParamsSchema),
  async (ctx) => {
    const credentials = SignInParamsSchema.parse(ctx.request.body);

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
  Routes.auth.SIGN_UP_CONFIRMATION,
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
  Routes.auth.SIGN_IN,
  koaBody(),
  validate(SignInParamsSchema),
  async (ctx) => {
    const credentials = SignInParamsSchema.parse(ctx.request.body);

    const [error, data] = await authenticationService.signIn(credentials);
    if (error) {
      ctx.status = error.status;
      ctx.body = error;
    } else {
      ctx.status = StatusCodes.OK;
      ctx.body = data;

      const { AuthenticationResult } = data;
      if (AuthenticationResult?.AccessToken != null) {
        const { AccessToken } = AuthenticationResult;
        ctx.request.header.authorization = AccessToken;
      }
    }
  }
);

authenticationRouter.post(
  Routes.auth.SIGN_OUT,
  koaBody(),
  validate(SignOutParamsSchema),
  async (ctx) => {
    const params = SignOutParamsSchema.parse(ctx.request.body);

    const [error, data] = await authenticationService.signOut(params);
    if (error) {
      ctx.status = error.status;
      ctx.body = error;
    } else {
      ctx.status = StatusCodes.OK;
      ctx.body = data;
    }
  }
);
