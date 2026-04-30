import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { getDataFromToken } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const decoded = await getDataFromToken();

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const users = await User.find({}, '-password').sort({ createdAt: -1 });

    return NextResponse.json(users);
  } catch (error: any) {
    console.error('Admin users fetch error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
