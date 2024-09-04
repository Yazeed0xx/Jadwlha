import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const reqBody = await req.json();
    const { email } = reqBody;

    const user2 = await User.findOne({ email }).select("_id");

    console.log("User:", user2); 
    
    return NextResponse.json({ user2 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
