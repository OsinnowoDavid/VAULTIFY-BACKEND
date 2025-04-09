import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

const app = express()

app.use(cors())
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("Welcome to the home page")
})


app.listen(8000, () =>{
    console.log("Server is running on port 8000")
})