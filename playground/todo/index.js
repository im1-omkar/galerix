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

function extractTodos(allTodos){
    const listOfTodos = []
    
    allTodos.forEach((u)=>{
        listOfTodos.push({"id":u._id,"title":u.title, "done":u.done})
    })

    return listOfTodos;

}

function auth(req, res, next){
    const userHeader = req.headers.authorization;
    const token = userHeader.split(" ")[1]
    
    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        //username is added to the req
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

app.post("/todo",auth,async (req,res)=>{
    
    try{
        const username = req.username;
        const user = await Users.findOne({"username":username})
        const userId = user._id;
        const title = req.body.title;
        const done = req.body.done;

        await Todos.create({userId:user,title,done})
        console.log("todo Inserted");

        res.json({"message":"todo inserted successfully"});
        return
    }
    catch(err){
        console.log(err.message);
    }

})

app.get("/todos",auth,async(req,res)=>{

    try{
        const username = req.username;
        const user = await Users.findOne({username});
        const userId = (user._id);
        const allTodos = await Todos.find({"userId":userId});
        const listOfTodos = extractTodos(allTodos);
        res.json({"all todos": listOfTodos});
        return;

    }
    catch(err){
        console.log("error while getting the requests: "+ err.message);
        res.json({"error while getting toods":err.message});
    }

})

app.patch("/mark/:_id",auth, async (req, res)=>{
    console.log("reacherd here!!!!!!!")
    
    try{
        const todoId = req.params;
        const username = req.username;

        const todo = await Todos.findOne({"_id":todoId});
        const currDone = todo.done;
        const newDone = !currDone

        const message = await Todos.updateOne({"_id":todoId},{"done":newDone})
        console.log(message);

        res.json({"message":"updated successfully"});
    }
    catch(err){
        console.log(err.message);
        res.json({"message: ":err.message});
    }

})

app.listen(PORT, ()=>{
    console.log("connection successfully on " + PORT)
})
