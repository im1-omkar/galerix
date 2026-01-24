import express from "express";
import responses from "../../utils/responses.js";

async function createContest(req:express.Request, res:express.Response){

    const role = (req as any).role;
    const id = (req as any).id;

    if(role !== "creator"){
            res.status(401).json(responses.error("FORBIDDEN"));
            return
    }

    try{

        //add the contest in DB
        

    }
    catch(err:any){
        console.log("error during creatingContest : " + err.message);
        res.status(500).send("internval server error");
        return;
    }
    
}

const controller = {
    "createContest": createContest
}

export default controller;