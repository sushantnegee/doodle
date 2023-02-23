const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");
const userRoutes = require('./routes/userRoutes')

const app = express();
dotenv.config();
connectDatabase();
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Api is running");
})

// app.get("/api/chat",(req,res)=>{
// res.send("data");
// })

// app.get("/api/chat/:id",(req,res)=>{
//     console.log(req.params.id)
// })

app.use('/api/user',userRoutes)

const PORT  = process.env.PORT || 5000; 
app.listen(PORT, console.log(`listning on ${PORT}`))