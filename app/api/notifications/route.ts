import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Notification from '@/models/Notification';

// GET all notifications
export async function GET() {
    await dbConnect();
    const data = await Notification.find().sort({ createdAt: -1 });
    return NextResponse.json(data);
}

// CREATE notification
export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();

    const notif = await Notification.create(body);

    return NextResponse.json(notif);
}