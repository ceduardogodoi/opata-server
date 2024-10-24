import type { Context, Next } from "koa";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { StatusCodes } from "http-status-codes";
import { env } from "../env";
import { UnauthorizedException } from "../models/exceptions/unauthorized.exception";
import { TokenSchema } from "../validations/authentication/token.validation";

export function authenticate() {
  return async function (ctx: Context, next: Next) {
    const result = TokenSchema.safeParse(ctx.request.header.authorization);

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
      const [, token] = result.data.split(" ");
      await verifier.verify(token);

      ctx.request.header.authorization = token;

      await next();
    } catch {
      ctx.status = StatusCodes.UNAUTHORIZED;
      ctx.body = new UnauthorizedException();
      ctx.set("Content-Type", "application/problem+json charset=utf-8");
    }
  };
}
