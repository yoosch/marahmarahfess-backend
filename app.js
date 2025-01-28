const dotenv = require("dotenv");  
dotenv.config();
const express = require("express");
const cors = require("cors");
const menfessRoute = require("./routes/menfessRoute");
const e = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

//routes
app.use("/api", menfessRoute);

app.get("/", (req, res) => {
    res.send("server is running");    
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})