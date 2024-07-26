import Koa, { Context } from 'koa'

import { env } from './env'
import { prisma } from './libs/prisma'
import { animalsRouter } from './routes/animals.routes'

async function main(): Promise<void> {
  const app = new Koa()

  // routes
  app.use(animalsRouter.routes())

  // run
  app.listen(env.PORT, () => {
    console.info(`
      - Server running on port ${env.PORT}.
      - CTRL + C to stop it.
    `)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)

    await prisma.$disconnect()

    process.exit(1)
  })
