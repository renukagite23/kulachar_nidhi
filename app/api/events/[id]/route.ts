import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Event from '@/models/Event';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();
    const { id } = await params;
    const event = await Event.findById(id);
    return NextResponse.json(event);
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    if (body.name) {
        body.slug = body.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '');
    }

    const event = await Event.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(event);
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();
    const { id } = await params;

    await Event.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
}