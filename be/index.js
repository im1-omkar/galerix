import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;
const saltRound = 8;
const JWT_SECRET = "jwt-secret"

const users = []


app.use(express.json()); //body parser
//add cors middleware

const auth = (req, res, next)=>{
    const userHeader = req.headers.authorization;
    const token = userHeader.split(" ")[1]

    jwt.verify(token, JWT_SECRET, (err, decoded)=>{
        if(err){
            res.json({"message": "error while authenticating token"})
            console.log("error in authentication")
            return
        }

        req.username = decoded.username;
        next()

    })
}

app.get("/special",auth,(req, res)=>{
    console.log("inside the special function");
    res.json({"message":"inside the special function , successful"})
})

app.post("/signup",async (req, res)=>{

    const username = req.body.username;
    const password = req.body.password;
    //& other user-information as well

    //search in db if user already exist

    var found = users.find((u) =>{
        if(u.username == username){
            return u
        }
    })

    if(found){
        console.log("user already exist");
        res.json({"message":"user already exist"})
        return
    }

    //hash the pass
    const hash = await bcrypt.hash(password, saltRound)

    if(hash){
        users.push({username, "hashPass": hash})
        res.json({"message":"user is registered successfully"})
        return
    }

    res.json({"message": "error while generating pass"})
})

app.post("/signin",async (req, res)=>{

    const username = req.body.username;
    const password = req.body.password;

    var user = users.find((u)=>{
        if(u.username == username){
            return u
        }
    })

    if(!user){
        console.log("user don't exist");
        res.json({"message":"user don't exist"})
        return
    }

    const userHash = user.hashPass

    bcrypt.compare(password, userHash, (err, result)=>{
        if(err){
            console.log("error while compairng pass")
            res.json({"message":"error while comparing pass"})
            return
        }
        if(result){
            //generate the jwt and return the jwt token
            const token = jwt.sign({"username":username}, JWT_SECRET)
            console.log("users signin successfully")
            res.json({"token":token})
            return
        }
        else{
            console.log("invalid pass")
            res.json({"message":"invalid password"})
            return
        }
    })

})

app.listen(PORT, ()=>{
    console.log("app is running on port :" + PORT)
})