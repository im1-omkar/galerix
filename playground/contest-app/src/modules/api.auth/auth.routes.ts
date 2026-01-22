import express from "express";
import { validator } from "../../middlewares/middleware.validator.js";
//import validSchema from "./auth.validateSchema"
//import controller from "./auth.controller"

const userRouter = express.Router();

userRouter.post("/signup",/**validate(validateSchema.signup) */ /** call controller*/)

userRouter.post("/signin",(req, res)=>{
    res.send("health from userRouter POST")
})

export default userRouter;