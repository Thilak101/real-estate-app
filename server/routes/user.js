const router = require("express").Router();
const { verifyToken } = require("../middleware/verifyUser");
const User = require("../models/User");
const {
  test,
  signupController,
  signinController,
  updateUserController,
  deleteController,
} = require("./controllers/user.controllers");

router.get("/", test);
router.post("/signup", signupController);
router.post("/signin", signinController);
router.put("/update/:id", verifyToken, updateUserController);
router.delete("/delete/:id", verifyToken, deleteController);

module.exports = router;
