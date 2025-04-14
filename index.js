import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import connectDB from "./config/mongodB.js"
import adminRouter from "./routes/adminRouter.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config()
const app = express()
// const allowedOrigin =['http://localhost:5173']
app.use(cors({
    // origin:allowedOrigin, 
    credentials:true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
connectDB()

app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
    res.send("Welcome to Vaultify Backend")
})


app.listen(8000, () =>{
    console.log("Server is running on port 8000")
})