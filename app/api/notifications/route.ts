import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Notification from '@/models/Notification';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';

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

// MARK ALL READ
export async function PATCH() {
    try {
        await dbConnect();
        const decoded = await getDataFromToken();
        if (!hasAdminAccess(decoded)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await Notification.updateMany({ isRead: false }, { isRead: true });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// CLEAR ALL
export async function DELETE() {
    try {
        await dbConnect();
        const decoded = await getDataFromToken();
        if (!hasAdminAccess(decoded)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await Notification.deleteMany({});
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}