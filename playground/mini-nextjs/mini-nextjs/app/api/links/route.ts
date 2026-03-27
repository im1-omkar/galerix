import connectDB from "@/app/libs/db";
import Links from "@/app/models/Links";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    try{

        await connectDB();

        const result = await Links.find();

        return NextResponse.json({
            success:true,
            result:result
        });

    }catch(err){
        console.log("error while Geting the data")
    }
    
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  try{
    await connectDB()

    const body = await req.json();

    const result = await Links.create(body);

    return NextResponse.json(result)


  }catch(err){
    console.log("error while creating link" + err);
    return NextResponse.json({
      "message": "internal server error"
    })
  }

  
}