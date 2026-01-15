import mongoose from "mongoose";

export default async function connectDB(){

    await mongoose.connect("mongodb+srv://admin:mongoTheSmall@cluster0.recove.mongodb.net/galarix")
    .then((res)=>{
        console.log("db is connected successfully")
    })
    .catch((err)=>{
        console.log(err.message)
    })

}

