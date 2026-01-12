import express from "express";
import jwt from "jsonwebtoken";

const app = express()
const PORT = 3000;

app.use(express.json())

const users = []
const jwtSecret = 'JWT_SECRET';

//creating a auth middleware -> to check wheter user is logedIn or not
const auth = (req,res,next)=>{
        
    //extract the token
    const token = req.headers.authorization

    if(token){
        jwt.verify(token,jwtSecret,(err, decoded)=>{
            if(err){
                res.json({"message":"failed to login"})
                return
            }

            req.username = decoded.username;
            next()
        })
    }
    else{
        res.json({"message":"no token present"})
    }


}

app.get("/special",auth,(req,res)=>{
    res.json({"message":"accessed to special route"})
})


//me route to verify the token
app.get("/me",(req,res)=>{
    //get the token
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)

    try{
            //get back the object from the token
                const decoded = jwt.verify(token, jwtSecret)

            //check the username of the object exists in the db
            const username = decoded.username;

            const found = users.find(u => u.username == username)

            if(found){
                res.json({"message":`authorization successful ${username}!`})
                return
            }

            res.status(401).json({"message":"incorrect token"})
    }
    catch{
         return res.status(401).json({ message: "Invalid token" });
    }

})

//signup route
app.post("/signup",(req, res)=>{
    //take the usrname(if not already exist) and password and store into db 
    const username = req.body.username;
    const password = req.body.password;

    if(username && password){
        users.push({username, password})
        res.json({"message":"signup is successful"})
        return;
    }

    res.json({"message":"entier valid username"})

})

//signin route
app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(u => u.username == username && u.password == password)

    if(user){
        //generate the token
        const token = jwt.sign({"username":username}, jwtSecret)

        //send the token back and also insert the token
        res.json({"token": token})
        return 
    }
    else{
        res.status(401).json({"message":"invalid email or passoword"})
    }

})

app.listen(PORT, ()=>{
    console.log("process is running on : " + PORT)
})