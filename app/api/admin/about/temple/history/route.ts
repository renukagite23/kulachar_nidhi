import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TempleHistory from '@/models/TempleHistory';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getDataFromToken();
    if (!user || !hasAdminAccess(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const history = await TempleHistory.findOne().lean();
    return NextResponse.json(history || {});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getDataFromToken();
    if (!user || !hasAdminAccess(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    let history = await TempleHistory.findOne();

    if (history) {
      Object.assign(history, body);
      await history.save();
    } else {
      history = await TempleHistory.create(body);
    }

    return NextResponse.json(history);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
