import mongoose from "mongoose";

export async function connectDB(){

    mongoose.connect("mongodb+srv://admin:mongoTheBig@cluster0.recove.mongodb.net/todos").then(()=>{
    console.log("db connected successfully")
    })
    .catch((err)=>{
        console.log(err.message);
    })

}
