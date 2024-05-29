const router = require("express").Router()
const userRoute = require("./user")
const googleAuthRouter = require("./googleAuth")

router.use("/user", userRoute)
router.use("/auth", googleAuthRouter)

module.exports = router