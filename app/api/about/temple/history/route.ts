import dbConnect from '@/lib/db';
import TempleHistory from '@/models/TempleHistory';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const history = await TempleHistory.findOne({ isPublished: true }).lean();
    if (!history) {
      return NextResponse.json({ error: 'History not found' }, { status: 404 });
    }
    return NextResponse.json(history);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
