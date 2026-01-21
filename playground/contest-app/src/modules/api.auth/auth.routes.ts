import express from "express";

const userRouter = express.Router();

userRouter.post("/signup",(req, res)=>{
    res.send("Health from userRouter POST")
})

userRouter.post("/signin",(req, res)=>{
    res.send("health from userRouter POST")
})

export default userRouter;