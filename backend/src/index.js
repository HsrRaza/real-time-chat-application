import express from "express"
import dotenv from "dotenv"
import http from "http"
import cors from "cors"

import { Server } from "socket.io"






dotenv.config({})

const app = express()
app.use(cors())

const server = http.createServer(app)

const port = process.env.PORT

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});


io.on("connection", (socket) => {
    console.log("New user connected ", socket.id);


    socket.on("send-message", (message) => {


        console.log(message);

        io.emit("receive-message", message)




    })


})



server.listen(port, () => {
    console.log(`server is running on ${port}`);

})