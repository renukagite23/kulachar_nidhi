import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import Trustee from '@/models/Trustee';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getDataFromToken();
    if (!user || !hasAdminAccess(user)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const trustees = await Trustee.find().sort({ sortOrder: 1 }).lean();
    return new Response(JSON.stringify(trustees), { status: 200 });
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
    
    // Get highest sortOrder
    const lastTrustee = await Trustee.findOne().sort({ sortOrder: -1 });
    const sortOrder = lastTrustee ? lastTrustee.sortOrder + 1 : 0;
    
    const trustee = await Trustee.create({ ...body, sortOrder });
    return new Response(JSON.stringify(trustee), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
