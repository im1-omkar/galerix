import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    hashPass:{
        type:String,
        required:true,
    }
})

const todoSchema = mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    title: String,
    done:Boolean
})

const Users  = mongoose.model("Users", userSchema);
const Todos = mongoose.model("Todos", todoSchema)

export {Users, Todos}