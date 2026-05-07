import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Event from '@/models/Event';

// UPDATE EVENT
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const body = await req.json();

        const { id } = await params;

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            body,
            { new: true }
        );

        if (!updatedEvent) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedEvent);

    } catch (error) {
        console.error('UPDATE EVENT ERROR:', error);

        return NextResponse.json(
            { error: 'Failed to update event' },
            { status: 500 }
        );
    }
}

// DELETE EVENT
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        await Event.findByIdAndDelete(id);

        return NextResponse.json({
            message: 'Event deleted successfully',
        });

    } catch (error) {
        console.error('DELETE EVENT ERROR:', error);

        return NextResponse.json(
            { error: 'Failed to delete event' },
            { status: 500 }
        );
    }
}