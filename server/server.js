const express = require("express")
require("dotenv").config()
const connectDB = require("./config/db")
const cors = require("cors")
const apiRouter = require("./routes")
const err = require("./middleware/err")
const cookieParser = require("cookie-parser")


const PORT = 4000 || process.env.PORT
const app = express()
connectDB()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use("/api", apiRouter)
app.use(err)


app.get("/", (req, res) => {
    res.send("server is working")
})

app.listen(PORT, () => {
    console.log(`server was started on ${PORT} PORT`)
})