const router = require("express").Router()
const { createListing } = require("./controllers/list.controllers")
const {verifyToken} = require("../middleware/verifyUser")

router.post("/create", verifyToken, createListing)

module.exports = router