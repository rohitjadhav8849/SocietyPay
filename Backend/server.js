const express=require("express");
const mongoose =require("mongoose");
const cors=require("cors");
require("dotenv").config();
const app =express();

app.use(cors());
app.use(express.json());

const http = require("http");
const {Server}=require("socket.io");
const server = http.createServer(app);
const io =new Server(server,{
  cors:{
    origin:"*"
  }
})

// socket connection
io.on("connection",(socket)=>{//here socket is one user connection  , if 5 users then 5 sockets
  //rohit->socket1   rohan->socket2
  console.log("User connected:",socket.id);//each user will get unique id

  //room
  socket.on("joinSociety",(societyid)=>{//group of users
    socket.join(societyid);
    console.log("Joined society :",societyid);
  })

  // join society room
  socket.on("sendMessage",(data)=>{
  const {societyid,message}=data;
  io.to(societyid).emit("receiveMessage",message);//broadcast to all in same society

  socket.on("sendAnnouncement",(data)=>{
    const {societyid,message}=data;
    io.to(societyid).emit("receiveAnnouncement",message);
  })
  
  socket.on("pinAnnouncement",(data)=>{
    const {societyid,message}=data;
    io.to.apply(societyid).emit("pinUpdated",message);
  })

  socket.on("unpinAnnouncement",(data)=>{
    const {societyid,message}=data;
    io.to.apply(societyid).emit("unpinUpdated",message);
  })

  socket.on("editAnnouncement",(data)=>{
    const {societyid,message}=data;
    io.to.apply(societyid).emit("editUpdated",message);
  })
  
  socket.on("deleteAnnouncement",(data)=>{
    const {message,societyid}=data;
    io.to.apply(societyid).emit("deleteAnnouncement",message);
  })

  socket.on("billCreated",(data)=>{
    const {message,societyid}=data;
    io.to.apply(societyid).emit("billCreated",bill);
  })

  socket.on("newNotification",()=>{
    io.to.apply(societyid).emit("newNotification",{title,message,type});
  })

  socket.on("disconnect",()=>{
    console.log("User disconnect");
  })

  
})
})


mongoose.connect(process.env.MONGO_URI)
.then(()=>
console.log("Mongodb connected"))
.catch(err=>
console.log(err));

const authroutes= require("./routes/authroutes");
const societyroutes=require("./routes/societyroutes");
const airoutes=require("./routes/ai-routes");

app.use((req,res,next)=>{
  req.io=io; 
  next();
})
app.use("/api/auth",authroutes);
app.use("/api/society",societyroutes);
app.use("/api/ml",airoutes);


app.get("/",(req,res)=>{
  res.send("societypay API running");
})

const PORT = process.env.PORT || 5000;

server.listen(PORT,"0.0.0.0",()=>{
  console.log(`Server running on port ${PORT}`);
})