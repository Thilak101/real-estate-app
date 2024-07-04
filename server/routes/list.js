const router = require("express").Router();
const {
  createListing,
  getUserListing,
  deleteListing,
  updateListing,
  getListing,
  getListings
} = require("./controllers/list.controllers");
const { verifyToken } = require("../middleware/verifyUser");

router.post("/create", verifyToken, createListing);
router.get("/listings/:id", verifyToken, getUserListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.put("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing)
router.get('/get', getListings)
module.exports = router;
