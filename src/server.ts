import Koa from 'koa'

import { env } from './env'
import { prisma } from './libs/prisma'
import { animalsRouter } from './routes/animals.routes'
import { authenticationRouter } from './routes/authentication.routes'

async function main(): Promise<void> {
  const app = new Koa()

  // routes
  app.use(animalsRouter.routes())
  app.use(authenticationRouter.routes())

  // run
  app.listen(env.PORT, () => {
    console.info(`
      - Server running on port ${env.PORT}.
      - CTRL + C to stop it.
    `)
  })
}

try {
  await main()
  await prisma.$disconnect()

} catch (error) {
  console.error(error)

  await prisma.$disconnect()
  process.exit(1)
}
