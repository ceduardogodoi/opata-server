import Koa from "koa";

import { env } from "./env";
import { prisma } from "./libs/prisma";
import { animalsRouter } from "./routes/animals.routes";
import { authenticationRouter } from "./routes/authentication.routes";
import { usersRouter } from "./routes/users.routes";

async function main(): Promise<void> {
  const app = new Koa();

  // routes
  app.use(animalsRouter.routes());
  app.use(authenticationRouter.routes());
  app.use(usersRouter.routes());

  // run
  app.listen(env.PORT, () => {
    console.info(`
      - Server is running.
      - CTRL + C to stop it.

      - Port:        ${env.PORT}
      - Environment: ${env.NODE_ENV}
    `);
  });
}

try {
  await main();
  await prisma.$disconnect();
} catch (error) {
  console.error(error);

  await prisma.$disconnect();
  process.exit(1);
}
