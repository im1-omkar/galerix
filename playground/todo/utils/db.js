import mongoose from "mongoose";

export async function connectDB(){

    mongoose.connect("").then(()=>{
    console.log("db connected successfully")
    })
    .catch((err)=>{
        console.log(err.message);
    })

}
