import {Client} from "pg";



async function connectDb(){
    

    try{

        const client = new Client({
                    connectionString : "postgresql://neondb_owner:@ep-cool-scene-ahpaji7m-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require"
        })

        await client.connect()
        console.log("connected successfully ")

        const response = await client.query(`INSERT INTO users (name, email) 
                        VALUES ('Omkar', 'omkar@example.com');`)

        console.log(response);
    }
    catch(err){
        console.log("erro while connecting db : "+err.message)
    }
}


connectDb()