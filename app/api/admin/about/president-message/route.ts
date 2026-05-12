import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import PresidentMessage from '@/models/PresidentMessage';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getDataFromToken();
    if (!user || !hasAdminAccess(user)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const message = await PresidentMessage.findOne().lean();
    return new Response(JSON.stringify(message || {}), { status: 200 });
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
    let message = await PresidentMessage.findOne();

    if (message) {
      Object.assign(message, body);
      await message.save();
    } else {
      message = await PresidentMessage.create(body);
    }

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
