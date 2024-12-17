
const express = require("express");
const app = express();
const PORT = 3000;
const mainRouter = require("./routes/index")
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use("/api/v1",mainRouter)

app.listen((PORT),() => {
    console.log(`app is listening at port ${PORT}`)
})