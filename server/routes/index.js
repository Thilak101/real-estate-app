const router = require("express").Router()
const userRoute = require("./user")
const googleAuthRouter = require("./googleAuth")
const listRoute = require("./list")

router.use("/user", userRoute)
router.use("/auth", googleAuthRouter)
router.use('/list', listRoute)

module.exports = router