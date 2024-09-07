import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from 'bcryptjs';
import { signup } from '@/types/Types';
import {z} from 'zod'

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const validatedData = signup.parse(reqBody);

    const { firstname, lastname, email, password } = validatedData;

    const hashpass = await bcrypt.hash(password, 10);

    await connectMongoDB();

    await User.create({ firstname, lastname, email, password: hashpass });

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.log('Error in API:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation failed', errors: error.errors },
        { status: 400 }
      );
    }

    
    return NextResponse.json(
      { message: 'Error during registration', error: (error as Error).message },
      { status: 500 }
    );
  }
}
