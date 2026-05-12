import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import Trustee from '@/models/Trustee';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const user = await getDataFromToken();
    if (!user || !hasAdminAccess(user)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { id } = await params;
    const trustee = await Trustee.findById(id).lean();
    if (!trustee) {
      return new Response(JSON.stringify({ error: 'Trustee not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(trustee), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const user = await getDataFromToken();
    if (!user || !hasAdminAccess(user)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const trustee = await Trustee.findByIdAndUpdate(id, body, { new: true });
    if (!trustee) {
      return new Response(JSON.stringify({ error: 'Trustee not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(trustee), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const user = await getDataFromToken();
    if (!user || !hasAdminAccess(user)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { id } = await params;
    const trustee = await Trustee.findByIdAndDelete(id);
    if (!trustee) {
      return new Response(JSON.stringify({ error: 'Trustee not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Trustee deleted successfully' }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
