import mongoose from "mongoose";

let isConnect = false

const connectDB = async ()=>{
    if(isConnect) return;

    try{
        await mongoose.connect(process.env.DATABASE_URL!)   
        
        isConnect = true;

        console.log("DB connected successfully")
    }
    catch(err){
        console.log("erorr while connecting to DB : " + err );
    }
}

export default connectDB