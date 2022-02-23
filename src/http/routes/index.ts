import { Router } from "express"

const router = Router()

router.get("/ping", ((req, res) => {
  res.json({
    status: "200",
    body: "pong"
  })
}))

export default router
