import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Donation from '@/models/Donation';
import { getDataFromToken } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const decoded = await getDataFromToken();

    if (!decoded) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const donations = await Donation.find({ userId: decoded.id }).sort({ createdAt: -1 });
    
    return NextResponse.json(donations);
  } catch (error: any) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
