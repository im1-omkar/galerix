import * as mongoose from "mongoose";

const mongoUrl = process.env.MONGODB_URL;

const connectDB = async ()=>{
    try{    
        await mongoose.connect(mongoUrl!)
        console.log("DB connected successfully")
    }catch(err){
        console.log("erorr while connecting DB : " + err)
    }   
}

export default connectDB