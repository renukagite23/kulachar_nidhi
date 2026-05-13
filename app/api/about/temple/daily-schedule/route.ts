import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import DailySchedule from '@/models/DailySchedule';

export async function GET() {
  try {
    await dbConnect();
    const schedule = await DailySchedule.findOne().sort({ createdAt: -1 });
    
    if (!schedule) {
      return NextResponse.json({ 
        english: { title: 'Daily Schedule', subtitle: 'Temple Timing Management', schedules: [] },
        marathi: { title: 'दैनंदिन कार्यक्रम', subtitle: 'मंदिर वेळापत्रक व्यवस्थापन', schedules: [] }
      });
    }

    return NextResponse.json(schedule);
  } catch (error: any) {
    console.error('FETCH SCHEDULE ERROR:', error);
    return NextResponse.json({ error: 'Failed to fetch schedule' }, { status: 500 });
  }
}
