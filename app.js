const express = require ("express");
const {createServer} = require ("node:http");
const {Server} = require ("socket.io")
const ChatRoute = require ("./src/routes/chat.route")
const MenuRoute = require("./src/routes/menu.route")
const OrderRoute = require("./src/routes/order.route")
const path = require('path');  



const app = express()



const server = createServer(app)

const io = new Server(server)

app.use(express.json());

app.use("/api", ChatRoute);
app.use("/admin", MenuRoute);
app.use("/order", OrderRoute);

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'))
})


io.on ('connection', (socket)=>{
    console.log("a user connected", socket.id)

    socket.on("message", (data) =>{
        console.log(data)
        socket.broadcast.emit("message", data)
    })


    socket.on("disconnect", () =>{
        console.log("User disconeected", socket.id)

    })
})



module.exports = app;