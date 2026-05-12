import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import TempleReach from '@/models/TempleReach';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getDataFromToken();
    if (!user || !hasAdminAccess(user)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const reach = await TempleReach.findOne().lean();
    return new Response(JSON.stringify(reach || {}), { status: 200 });
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
    let reach = await TempleReach.findOne();

    if (reach) {
      Object.assign(reach, body);
      await reach.save();
    } else {
      reach = await TempleReach.create(body);
    }

    return new Response(JSON.stringify(reach), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
