import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    title_en: String,
    title_mr: String,
    desc_en: String,
    desc_mr: String,
    date: String,
    image: String,
  },
  { timestamps: true }
);

const Event =
  mongoose.models.Event || mongoose.model('Event', EventSchema);

// ✅ GET EVENTS
export async function GET() {
  try {
    await dbConnect();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(events);
  } catch (error) {
    console.error('GET EVENTS ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// ✅ CREATE EVENT
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const newEvent = await Event.create({
      title_en: body.title_en,
      title_mr: body.title_mr,
      desc_en: body.desc_en,
      desc_mr: body.desc_mr,
      date: body.date,
      image: body.image || '',
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('POST EVENT ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}