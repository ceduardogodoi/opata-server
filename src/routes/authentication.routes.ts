import Router from "@koa/router";
import { StatusCodes } from "http-status-codes";
import { AuthenticationService } from "../services/authentication.service";
import { validate } from "../middlewares/validate.middleware";
import { koaBody } from "koa-body";
import { SignInParamsSchema } from "../validations/authentication/sign-in.validation";
import { ConfirmSignUpParamsSchema } from "../validations/authentication/confirm-sign-up.validation";
import { SignOutParamsSchema } from "../validations/authentication/sign-out.validation";
import { Routes } from "./routes";
import { CookiesKeys } from "../enums/auth";

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
  validate(ConfirmSignUpParamsSchema),
  async (ctx) => {
    const params = ConfirmSignUpParamsSchema.parse(ctx.request.body);

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

      if (data.AuthenticationResult?.AccessToken != null) {
        ctx.cookies.set(
          CookiesKeys.ACCESS_TOKEN,
          data.AuthenticationResult.AccessToken,
          {
            httpOnly: true,
          }
        );
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
