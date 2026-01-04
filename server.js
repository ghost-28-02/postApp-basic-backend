const express = require('express');
const app = express();
require("dotenv").config();

app.use(express.json());

const PORT = process.env.PORT || 4000;

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");

app.use("/api/v1/posts",postRoutes);
app.use("/api/v1/users",userRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Start Successfully at Port No. ${PORT}`);
})

const dbConnect = require("./config/database");
dbConnect();


app.get("/", (req,res)=>{
    res.send(`<h1>This is Homepage Baby</h1>`);
})
