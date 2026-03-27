import connectDB from "@/app/libs/db";
import Links from "@/app/models/Links";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  try{
    await connectDB()

    const result = await Links.findById( "69c61f56c44b5a1d4a2d87da");

    return NextResponse.json({
      "success":true,
      "data":result
    })


  }catch(err){
    console.log("error while creating link" + err);
    return NextResponse.json({
      "message": "internal server error"
    })
  }

  
}