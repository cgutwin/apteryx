import express, { Application } from "express"
import router from "./routes"

export interface ExpressConfig {
  port: number
}

export default class ExpressHTTP {
  readonly port: number
  application: Application

  constructor(config: ExpressConfig) {
    this.application = express()
    this.port = config.port
  }

  init() {
    this.application.use('/', router)
    this.listen()
  }

  protected listen() {
    this.application.listen(this.port, () => console.log("listening"))
  }
}
