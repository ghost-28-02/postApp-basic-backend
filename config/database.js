const mongoose = require("mongoose");
require('dotenv').config();

const dbConnection = () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then( ()=> console.log("DB connection Successfully"))
    .catch( (e)=>{
        console.log("Issue in DB Connection");
        console.log(e.message);
        process.exit(1);
    })
}

module.exports = dbConnection;

