const router = require("express").Router()
const User = require("../models/User")
const {test, signupController} = require("./controllers/user.controllers")

router.get("/", test)
router.post("/signup", signupController)


module.exports = router