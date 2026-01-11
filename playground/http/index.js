import express from "express"

const app = express()

let count = 0

app.use(express.json())

app.use((req,_res,next)=>{

    next()
})

function auth(_req,_res,next){
    console.log("request is made to the very very special function")
    next()
}

app.get("/getcount",(req, res)=>{
    res.json({
        "count": count
    })

})

app.get("/test",(req,res)=>{
    console.log("inside the test")
    res.send(300)
})

app.get("/sum",(req,res)=>{
    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)

    res.json({
        "greet":"hello there",
        "ans":a+b
    })
})

app.get("/special", auth ,(req,res)=>{
    console.log("inside the special")
    res.json({
        "greed":"hello from special"
    })
})

app.listen(3000,()=>{
    console.log("port is listening to 3000")
})
