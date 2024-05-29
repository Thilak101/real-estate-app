const router = require("express").Router()
const { googleAuth } = require("./controllers/googleAuth.controllers")


router.post("/google", googleAuth)

module.exports = router