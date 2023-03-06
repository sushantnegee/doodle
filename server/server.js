const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require("./middleware/errMiddleware");
const chatRoutes = require('./routes/chatRoutes')

const app = express();
dotenv.config();
connectDatabase();
app.use(express.json());

// app.get('/', (req,res)=>{
//     res.send("Api is running");
// })
app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)

// app.get("/api/chat",(req,res)=>{
// res.send("data");
// })

// app.get("/api/chat/:id",(req,res)=>{
//     console.log(req.params.id)
// })

app.use(notFound);
app.use(errorHandler);


const PORT  = process.env.PORT || 5000; 
app.listen(PORT, console.log(`listning on ${PORT}`))