const mongoose = require("mongoose")

const uri = process.env.MONGODB_URL

mongoose.set("strictQuery", false)

const connectDB = async() => {
    try {
        const connectDB = await mongoose.connect(uri)
        console.log(`MONGODB isconnected ${connectDB.connection.host}`)
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = connectDB