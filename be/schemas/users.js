import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    user:{
        type:String,
        unique:true,
        required:true
    },
    hashPass:{
        type:String,
        required:true
    }
})

export default Users = mongoose.model("Users", userSchema);