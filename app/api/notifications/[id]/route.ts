import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Notification from '@/models/Notification';

// DELETE
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();
    const { id } = await params;
    await Notification.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
}

// MARK AS READ
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();
    const { id } = await params;

    const updated = await Notification.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true }
    );

    return NextResponse.json(updated);
}