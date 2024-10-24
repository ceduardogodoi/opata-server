import Router from "@koa/router";
import { StatusCodes } from "http-status-codes";
import { Routes } from "./routes";
import { UsersService } from "../services/users.service";
import { authenticate } from "../middlewares/authenticate.middleware";
import { TokenSchema } from "../validations/authentication/token.validation";
import { CookiesKeys } from "../enums/auth";

export const usersRouter = new Router({
  prefix: Routes.users.PREFIX,
});

const usersService = new UsersService();

usersRouter.get(Routes.users.ROOT, authenticate(), async (ctx) => {
  const token = TokenSchema.parse(ctx.cookies.get(CookiesKeys.ACCESS_TOKEN));

  const [error, data] = await usersService.getUser(token);
  if (error) {
    ctx.status = error.status;
    ctx.body = error;
  } else {
    ctx.status = StatusCodes.OK;
    ctx.body = data;
  }
});
