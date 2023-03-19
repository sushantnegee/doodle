const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require("./middleware/errMiddleware");
const chatRoutes = require('./routes/chatRoutes')
const cors = require('cors');
const app = express();
app.use(cors());
dotenv.config();
connectDatabase();
app.use(express.json());

// app.get('/', (req,res)=>{
//     res.send("Api is running");
// })
app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)

// app.get("/api/chat",(req,res)=>{
// res.send("data");
// })

// app.get("/api/chat/:id",(req,res)=>{
//     console.log(req.params.id)
// })

app.use(notFound);
app.use(errorHandler);


const PORT  = process.env.PORT || 5000; 
const server = app.listen(PORT, console.log(`listning on ${PORT}`))

const io  = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000",
    }
})

io.on('connection',(socket)=>{
    console.log('connected to socket.io')

    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected")
    })

    socket.on("join chat",(room)=>{
        socket.join(room);
        console.log("user joined the room ", room);
        
    })

    socket.on("typing",(room)=>socket.in(room).emit("typing"))
    socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"))

    socket.on("new message",(newMessageReceived)=>{
        let chat = newMessageReceived.chat;

        if(!chat.users) return console.log('chat.users not defined')

        chat.users.forEach(user => {
            if(user._id == newMessageReceived.sender._id) return;
            
            socket.in(user._id).emit("message received",newMessageReceived)
        });
        
    })
})