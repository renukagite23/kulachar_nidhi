import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Event from '@/models/Event';
import Notification from '@/models/Notification';

export async function GET() {
    await connectDB();

    const events = await Event.find().sort({ startDate: 1 });

    return NextResponse.json(events);
}

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();

    const slug = body.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');

    const event = await Event.create({
        ...body,
        slug,
    });

    // Create Notification
    await Notification.create({
        title: 'New Event Created',
        message: `Event "${event.name}" has been added to the calendar.`,
        type: 'event',
    });

    return NextResponse.json(event);
}