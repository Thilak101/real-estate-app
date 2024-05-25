const router = require("express").Router()
const User = require("../models/User")
const {test} = require("./controllers/user.controllers")

router.get("/", test)


module.exports = router