const User = require("../../models/User")

const test = (req, res) => {
    try {
        res.json({msg: "user router"})
    }
    catch(err) {
        res.json({msg: err.message})
    }
}

module.exports = {
    test
}