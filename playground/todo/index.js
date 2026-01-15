import express from "express";
import {Users, Todos} from "./schema/db.js";
import {connectDB} from "./utils/db.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";


const app = express();
const PORT = 3000;
const saltRound = 8;
const JWT_SECRET = "jsonsecret";

app.use(express.json()); //body parser

connectDB();

function auth(req, res, next){
    const userHeader = req.headers.authorization;
    const token = userHeader.split(" ")[1]
    
    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        req.username = decoded.username;
        console.log("authorization is successful")
        next()
    }
    catch(err){
        console.log("error while authenticalting",err.message)
        res.json({"message":"invalid token"})
    }

}

app.post("/signup",async (req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password){
        res.json({"message":"enter credentials"});
        return
    }

    try{
        const result = await Users.findOne({"username":username})

        if(result){
            //user already exist
            console.log("user already exists");
            res.json({"message":"user already present"})
            return
        }

        const hashPass = await bcrypt.hash(password, saltRound);

        await Users.create({"username":username, "hashPass":hashPass});

        console.log("user signUP successfully");
        return res.json({"message":"signup successfull"})

    }
    catch(err){
        console.log("error while signing up : "+ err.message);
        res.json({message:err.message})
    }

})

app.post("/signin",async (req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password){
        res.json({"message":"enter credentials"});
        return
    }

    try{

        //compare username
        const user = await Users.findOne({"username":username});

        if(!user){
            res.json({"message":"invalid credentials"});
            console.log("can't find user");
            return
        }

        const hashPass = user.hashPass;

        //compare pass
        const result = await bcrypt.compare(password,hashPass)

        if(!result){
            res.json({"message":"invalid password"})
            console.log("invalid password");
            return
        }

        const token =  jwt.sign({"username":username}, JWT_SECRET)

        console.log("user signed successfully");
        return res.json({"message":"sigining is successfull", "token":token})

    }
    catch(err){
        console.log(err.message);
        res.json({"message":err.message});
    }

})

app.post("/todo",auth,(req,res)=>{
    console.log("inside todo")
    res.json({"message":"inside todo"})
})

app.get("/todos",(req,res)=>{

})

app.listen(PORT, ()=>{
    console.log("connection successfully on " + PORT)
})