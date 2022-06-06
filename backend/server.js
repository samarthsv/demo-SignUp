import express from "express"
import dotenv from "dotenv"
import connectToDB from "./utils/connectToDB.js"
import userRouter from "./routes/user.js"
import cors from "cors"


const app = express()
dotenv.config()
connectToDB()
app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.listen(process.env.PORT || 5000)