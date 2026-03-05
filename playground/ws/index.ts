import express from "express";
import WebSocket, {WebSocketServer} from "ws";

const app = express();

const httpServer = app.listen(3000,()=>{console.log("app is listing on port 3000")})

const wss = new WebSocketServer({server: httpServer})

wss.on('connection',(ws)=>{

    ws.on('error',console.error);

    ws.on('message',(data, isBinary)=>{
        //send the message to all  --> using the client.send(//mfing message)
        wss.clients.forEach((client)=>{
            client.send("message  "+ data)
        })
    })

    ws.send("welcome to the server buddy!")

})