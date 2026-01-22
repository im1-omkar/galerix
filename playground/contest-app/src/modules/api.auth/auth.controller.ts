//write overall business logic
import express from "express";
import { responses } from "../../utils/responses.js";
//import {checkEmail} from "./auth.services.ts"

async function signup(req:express.Request, res:express.Response){
    //take out the name, email, password and role from the req
    const name = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    try{

        /**
         * check if email already exists and  
         * if exists then send response back and return
         */

        //const emailSearch = checkEmail(email)
        //if(emailSearch) --> res and return


        /**
         * bcrypt the password
         */

        //bcrypt.hash(password, SaltRound)

        /**
         * store in DB
         */

        //userEnteryInDb(user,email,hash,role)

        /**
         * send the success message
         */

        res.json(responses.success("user signup successfully"))
        

    }catch(err){


    }
    

}