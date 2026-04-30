import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Donation from '@/models/Donation';
import { getDataFromToken } from '@/lib/auth';

async function checkAdmin() {
  const decoded = await getDataFromToken();
  if (!decoded || decoded.role !== 'admin') return false;
  return true;
}

export async function GET() {
  try {
    await dbConnect();
    if (!(await checkAdmin())) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const donations = await Donation.find({}).sort({ createdAt: -1 });
    return NextResponse.json(donations);
  } catch (error: any) {
    console.error('Admin donations fetch error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
