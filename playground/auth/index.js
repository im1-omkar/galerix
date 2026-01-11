import express from "express";

const app = express();
const PORT = 3000;

const users = [ { username: 'omkar', password: 'verysecret', token: 'gj5eqbeause' } ];

app.use(express.json())

function generateToken(){
    //generate a random string
    return Math.random().toString(36).slice(2);
}

app.get("/me",(req,res)=>{
    //get the token
    const token  = req.headers.authorization;
    console.log(token)

    //find in the user's tabel
    const user = users.find((u)=>{
        if(u.token == token) return u;
    });
  
    if(user){
        //return the username
        res.json({
            "username":user.username
        })
        return;
    }

    //return the unauthorization message
    res.status(401).json({
        "message":"unauthorized"
    })

})

app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const token = "xyz"
    
    users.push({username,password,token})
    console.log(users)
    res.json({
        "message": "user registered successfully"
    })
})

app.post("/signin",(req,res)=>{
    const username  = req.body.username;
    const password = req.body.password;

    const user = users.find((u)=>{
        if(u.username == username && u.password == password) return u;
    })

    if(user){
        const token = generateToken();
        res.json({
            "token":token
        })

        const user = users.find((u)=>{
            if(u.username == username) return u;
        })
        user.token = token;
        console.log(users)

        return
    }

    res.status(401).json({
        "message":"unauthorized"
    })
})

app.listen(PORT,()=>{
    console.log("listening to port" + PORT)
})