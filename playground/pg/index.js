import {Client} from "pg";


async function connectDb(){
    

    try{
        const client = new Client({
            connectionString : ""
        })

        await client.connect()
        console.log("connected successfully ")
    }
    catch(err){
        console.log("erro while connecting db : "+err.message)
    }
}

connectDb()