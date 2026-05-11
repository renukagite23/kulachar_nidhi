import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ActivityLog from '@/models/ActivityLog';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';

export async function GET() {
  try {
    await dbConnect();
    const decoded = await getDataFromToken();

    if (!hasAdminAccess(decoded)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const logs = await ActivityLog.find({})
      .populate('user', 'name role')
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return new Response(JSON.stringify(logs || []), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Activity logs fetch error:', error);
    return new Response(JSON.stringify({ message: 'Server error', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
