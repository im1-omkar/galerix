import mongoose from "mongoose";
import {Users} from "./schema/Users.js";
import {Chat} from "./schema/Chat.js"


async function db(){
    await mongoose.connect("mongodb+srv://admin:mongoTheSmall@cluster0.recove.mongodb.net/galarix")
        .then(()=>{
            console.log("connection made successfully")
        })
        .catch((err)=>{
            console.log("error occur while connecting db")
            console.log(err.message)
        });

    await Chat.create({
        user:"thegreatuser",
        chat: "this is the chat of the year"
    }).then( (res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err.message)
    })
    
    
}

db()

