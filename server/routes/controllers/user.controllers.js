const User = require("../../models/User")
const bcrypt = require("bcrypt")

const test = (req, res) => {
    try {
        res.json({msg: "user router"})
    }
    catch(err) {
        res.json({msg: err.message})
    }
}

const signupController = async(req, res) => {
    try {
        const hassedPassword = bcrypt.hashSync(req.body.password, 8)
        const user = await User.create({
            username: req.body.username,
            password: hassedPassword,
            email: req.body.email
        })
        res.json({msg: user, success: true})
    }
    catch(err) {
        res.json({msg: err.message})
    }
}

module.exports = {
    test,
    signupController
}