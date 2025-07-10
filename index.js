import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import connectDB from "./config/mongodB.js"
import adminRouter from "./routes/adminRouter.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import serviceBookingRoutes from "./routes/ServiceProviderRoutes.js"
import ElectricRoutes from "./routes/ElectricServiceRoutes.js"
import FireFighterRoutes from "./routes/FireFighterRoutes.js"
import GardenServiceRoutes from "./routes/GardenServiceRoutes.js"
import LandScapingRoutes from "./routes/LandScapingRoutes.js"
import PestControlRoutes from "./routes/PestControlRoutes.js"
import PlumbingRoutes from "./routes/PlumbingRoutes.js"
import ApplianceRoutes from "./routes/ApplianceRepairRoutes.js"
import GeneralServiceRoutes from "./routes/GeneralServiceRoutes.js"
dotenv.config()
const app = express()
app.use(express.json())
const allowedOrigin =['http://localhost:5173',"https://vaultify-omega.vercel.app"]
app.use(cors({
    origin:allowedOrigin, 
    credentials:true,    
    methods: ["GET","POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type","Authorization"]
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
connectDB()

app.use("/api/admin", adminRouter);
app.use("/api/" ,serviceBookingRoutes)
app.use("/api/electric", ElectricRoutes)
app.use("/api/fireFighter", FireFighterRoutes)
app.use("/api/garden", GardenServiceRoutes)
app.use("/api/landScaping", LandScapingRoutes)
app.use("/api/pestControl", PestControlRoutes)
app.use("/api/plumbing", PlumbingRoutes)
app.use("/api/appliance", ApplianceRoutes)
app.use("/api/general",GeneralServiceRoutes)
app.get("/", (req, res) => {
    res.send("Welcome to Vaultify Backend")
})


app.listen(8000, () =>{
    console.log("Server is running on port 8000")
})