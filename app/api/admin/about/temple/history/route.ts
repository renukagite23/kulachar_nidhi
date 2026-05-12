import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import TempleHistory from '@/models/TempleHistory';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getDataFromToken();
    if (!user || !hasAdminAccess(user)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const history = await TempleHistory.findOne().lean();
    return new Response(JSON.stringify(history || {}), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getDataFromToken();
    if (!user || !hasAdminAccess(user)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const body = await req.json();
    let history = await TempleHistory.findOne();

    if (history) {
      Object.assign(history, body);
      await history.save();
    } else {
      history = await TempleHistory.create(body);
    }

    return new Response(JSON.stringify(history), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
