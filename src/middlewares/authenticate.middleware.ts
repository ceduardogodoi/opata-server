import type { Context, Next } from "koa";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { StatusCodes } from "http-status-codes";
import { env } from "../env";
import { UnauthorizedException } from "../models/exceptions/unauthorized.exception";
import { TokenSchema } from "../validations/authentication/token.validation";
import { CookiesKeys } from "../enums/auth";

export function authenticate() {
  return async function (ctx: Context, next: Next) {
    const accessToken = ctx.cookies.get(CookiesKeys.ACCESS_TOKEN);
    const result = TokenSchema.safeParse(accessToken);

    if (!result.success) {
      ctx.status = StatusCodes.UNAUTHORIZED;
      ctx.body = new UnauthorizedException();
      ctx.set("Content-Type", "application/problem+json charset=utf-8");

      return;
    }

    const verifier = CognitoJwtVerifier.create({
      userPoolId: env.AWS_COGNITO_USER_POOL_ID,
      tokenUse: "access",
      clientId: env.AWS_COGNITO_CLIENT_ID,
    });

    try {
      await verifier.verify(result.data);

      await next();
    } catch {
      ctx.status = StatusCodes.UNAUTHORIZED;
      ctx.body = new UnauthorizedException();
      ctx.set("Content-Type", "application/problem+json charset=utf-8");
    }
  };
}
