const router = require("express").Router()
const User = require("../models/User")
const {test, signupController, signinController} = require("./controllers/user.controllers")

router.get("/", test)
router.post("/signup", signupController)
router.post("/signin", signinController)


module.exports = router