import express from 'express'
import logger from 'loglevel'

import { NextHandlerType } from ".";
import errorHandler from './middleware/error'

const chalk = require('chalk')

function startServer(handle: NextHandlerType, port: number) {
  const app = express()

  app.disable('x-powered-by')
  app.use(errorHandler)

  app.all('*', (req, res) => {
    return handle(req, res)
  })

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(chalk.blue(`
  ██████████████████████████████████████████████████████████████████████████████╗
  ██                                                                          ██║
  ██  ███╗   ███╗██╗   ██╗████████╗ █████╗ ██████╗ ██╗      ██████╗  ██████╗  ██║
  ██  ████╗ ████║██║   ██║╚══██╔══╝██╔══██╗██╔══██╗██║     ██╔═══██╗██╔════╝  ██║
  ██  ██╔████╔██║██║   ██║   ██║   ███████║██████╔╝██║     ██║   ██║██║       ██║
  ██  ██║╚██╔╝██║██║   ██║   ██║   ██╔══██║██╔══██╗██║     ██║   ██║██║       ██║
  ██  ██║ ╚═╝ ██║╚██████╔╝   ██║   ██║  ██║██████╔╝███████╗╚██████╔╝╚██████╗  ██║
  ██  ╚═╝     ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝  ██║
  ██████████████████████████████████████████████████████████████████████████████║
  ╚═════════════════════════════════════════════════════════════════════════════╝
      `))

      logger.info(chalk.green(`Server [PTOLEMAIOS] listening on port : ${port}\n`))
      resolve(server)
    })
  })
}

export { startServer }