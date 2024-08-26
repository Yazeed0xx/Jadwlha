import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const reqBody = await req.json();
    const { email } = reqBody;

    // Querying the database to check if the user exists
    const user2 = await User.findOne({ email }).select("_id");

    console.log("User:", user2); // Logging the user data for debugging
    
    // Returning a JSON response with the user data (or null if not found)
    return NextResponse.json({ user2 });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
