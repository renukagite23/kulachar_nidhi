import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ActivityLog from '@/models/ActivityLog';
import { getDataFromToken } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const decoded = await getDataFromToken();

    if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'president')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const logs = await ActivityLog.find({})
      .populate('user', 'name role')
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json(logs);
  } catch (error: any) {
    console.error('Activity logs fetch error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
