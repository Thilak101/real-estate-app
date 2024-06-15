const errorHandler = require("../../middleware/error");
const Listing = require("../../models/Lisiting.model");

const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};

const getUserListing = async(req, res, next) => {
 if(req.user.id === req.params.id) {
  try {
    const listing = await Listing.find({userRef: req.params.id})
    res.status(200).json(listing)
  } catch(err) {
    next(err)
  }
 } else {
  return next(errorHandler(401, "You only view your own listing!"))
 }
}

module.exports = {
  createListing,
  getUserListing
};
