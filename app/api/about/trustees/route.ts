import dbConnect from '@/lib/db';
import Trustee from '@/models/Trustee';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const trustees = await Trustee.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
    return NextResponse.json(trustees);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
