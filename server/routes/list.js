const router = require("express").Router()
const { createListing, getUserListing, deleteListing } = require("./controllers/list.controllers")
const {verifyToken} = require("../middleware/verifyUser")

router.post("/create", verifyToken, createListing)
router.get('/listings/:id', verifyToken, getUserListing)
router.delete('/delete/:id', verifyToken, deleteListing)

module.exports = router