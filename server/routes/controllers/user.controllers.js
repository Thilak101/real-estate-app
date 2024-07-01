const User = require("../../models/User");
const errorHandler = require("../../middleware/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const signinController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials!"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ success: true, rest });
  } catch (err) {
    next(err);
  }
};

const updateUserController = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You can only update your own account"));
    }
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

const deleteController = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You can only delete your own account!"));
    }
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res
      .status(200)
      .json({ success: true, message: "User has been deleted..." });
  } catch (err) {
    next(err);
  }
};

const signoutController = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ msg: "User has been logged out!", success: true });
  } catch {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found"));
    const { password: pass, ...rest } = user._doc;
    res.status(200).json({ rest, msg: "user", success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  test,
  signupController,
  signinController,
  updateUserController,
  deleteController,
  signoutController,
  getUser,
};
