const express = require("express");
const dotenv = require("dotenv")



const app = express();
dotenv.config();

app.get('/', (req,res)=>{
    res.send("Api is running");
})

app.get("/api/chat",(req,res)=>{
res.send("data");
})

app.get("/api/chat/:id",(req,res)=>{
    console.log(req.params.id)
})

const PORT  = process.env.PORT || 5000; 
app.listen(PORT, console.log(`listning on ${PORT}`))