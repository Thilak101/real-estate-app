const User = require("../../models/User");
const errorHandler = require("../../middleware/error");
const bcrypt = require("bcrypt");

const test = (req, res) => {
  try {
    res.json({ msg: "user router" });
    return;
  } catch (err) {
    return res.json({ msg: err.message });
  }
};

const signupController = async (req, res, next) => {
  try {
    const hassedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = await User.create({
      username: req.body.username,
      password: hassedPassword,
      email: req.body.email,
    });
    return res
      .status(201)
      .json({ user, msg: "user created successfully", success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  test,
  signupController,
};
