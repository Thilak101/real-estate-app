const router = require("express").Router()
const { createListing } = require("./controllers/list.controllers")
const {verifyToken} = require("../middleware/verifyUser")

router.get("/create", verifyToken, createListing)

module.exports = router