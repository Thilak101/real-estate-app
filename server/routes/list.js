const router = require("express").Router()
const { createListing, getUserListing } = require("./controllers/list.controllers")
const {verifyToken} = require("../middleware/verifyUser")

router.post("/create", verifyToken, createListing)
router.get('/listings/:id', verifyToken, getUserListing)

module.exports = router