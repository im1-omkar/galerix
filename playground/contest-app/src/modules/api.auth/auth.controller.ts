//write overall business logic
import express from "express";
import responses  from "../../utils/responses.js";
import { checkEmail, userEnteryInDb } from "./auth.services.js";
import bcrypt from "bcrypt";
import { hash } from "zod";
import jwt from "jsonwebtoken";
//import {checkEmail} from "./auth.services.ts"

async function signup(req:express.Request, res:express.Response){
    //take out the name, email, password and role from the req
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    try{

        /**
         * check if email already exists and  
         * if exists then send response back and return
         */

        //const emailSearch = checkEmail(email)
        const emailSearch = await checkEmail(email)
        //if(emailSearch) --> res and return
        if(emailSearch){
            res.status(400).json(responses.error("EMAIL_ALREADY_EXISTS"))
            return
        }


        /**
         * bcrypt the password
         */

        //bcrypt.hash(password, SaltRound)
        const hash = await bcrypt.hash(password, 8)

        /**
         * store in DB
         */

        //userEnteryInDb(user,email,hash,role)
        await userEnteryInDb(name,email,hash,role)

        /**
         * send the success message
         */

        res.json(responses.success("user signup successfully"))
        

    }catch(err:any){

        res.status(500).send("internal server error");
        console.log("internal server error while singing-up : " + err)
        return

    }
    

}

async function signin(req:express.Request,res:express.Response){
    const email = req.body.email;
    const password = req.body.password;

    try{
        //get out the user from the db whith email = email & get it's hash pass
        const user = await getUser(email);

        if(!user){
            res.status(401).json(responses.error("INVALID_CREDENTIALS"))
            return;
        }

        //compare the password 
        const match = bcrypt.compare(password,hash)

        if(!match ){
            res.status(401).json(responses.error("INVALID_CREDENTIALS"));
            return;
        }

        //return the jwt 
        const JWT_TOKEN = jwt.sign({})

        //return success response

        
    }
    catch(err:any){
        console.log("error while signing-in : " + err.message)
    }

}

const controller = {
    "signup":signup,
    "signin":signin
}

export default controller;