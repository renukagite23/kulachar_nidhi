import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Donation from '@/models/Donation';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';

async function checkAdmin() {
  const decoded = await getDataFromToken();
  if (!hasAdminAccess(decoded)) return false;
  return true;
}

export async function GET() {
  try {
    await dbConnect();
    if (!(await checkAdmin())) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const donations = await Donation.find({}).sort({ createdAt: -1 }).lean();
    console.log("Admin API returning donations type:", typeof donations, Array.isArray(donations), donations.length);
    return new Response(JSON.stringify(donations || []), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Admin donations fetch error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
