import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    user:{
       type:String
    },
    chat:{
        type:String,
    }
})

export const Chat = mongoose.model("Chat",chatSchema);
