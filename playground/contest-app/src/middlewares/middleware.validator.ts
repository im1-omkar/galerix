import express from "express";

export function validator(validateSchema:any /**here only few specific types of bodys are allowed */){

    return (req:express.Request,res:express.Response,next:express.NextFunction)=>{
        //make zod validation of request.body
    }

}