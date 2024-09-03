import { connectMongoDB } from "../../../../lib/mongodb";
import Taskdata from "../../../../models/Taskdata";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const tasks = await req.json();
    const result = await Taskdata.insertMany(tasks);

    return NextResponse.json(
      { message: 'Tasks scheduled successfully', insertedIds: result.map(task => task._id) },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to schedule tasks' },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
    try {
      await connectMongoDB();
      const tasks = await Taskdata.find({});
      return NextResponse.json({ tasks }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: 'Failed to fetch tasks' },
        { status: 500 }
      );
    }
  }
  
  

export const methods = ['POST','GET'];  // Only allow POST requests
     





 