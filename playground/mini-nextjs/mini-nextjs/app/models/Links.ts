import mongoose from "mongoose";


const LinkSchema = new mongoose.Schema({
    title:String,
    url:String,
    tag:{
        type:String,
        required:false
    }
})

const Links = mongoose.models.Links || mongoose.model("Links", LinkSchema);

export default Links;