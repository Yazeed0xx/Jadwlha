import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { name, firstname, lastname, email, password, phone } = reqBody;
        const hashpass = await bcrypt.hash(password, 10)

        if (!name || !firstname || !lastname || !email || !password || !phone) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        await connectMongoDB();
        await User.create({ name, firstname, lastname, email, password:hashpass, phone });

        return NextResponse.json({
            message: "User registered successfully",
        }, { status: 201 });

    } catch (error) {
        console.log("Error in API:", error);

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: "Invalid JSON format", error: error.message },
                { status: 400 }
            );
        } else {
            return NextResponse.json(
                { message: "Error during registration", error: error.message },
                { status: 500 }
            );
        }
    }
}