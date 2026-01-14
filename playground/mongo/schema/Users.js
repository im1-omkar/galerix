import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        unique:true,
    },
    passHash:{
        type:String,
        required:true,
        unique:true,
    }
})

export const Users = mongoose.model("Users",userSchema)