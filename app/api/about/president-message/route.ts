import dbConnect from '@/lib/db';
import PresidentMessage from '@/models/PresidentMessage';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const message = await PresidentMessage.findOne().lean();
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
    return NextResponse.json(message);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
