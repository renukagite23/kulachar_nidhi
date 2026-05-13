import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import DailySchedule from '@/models/DailySchedule';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';

export async function GET() {
  try {
    await dbConnect();
    const user = await getDataFromToken();
    if (!user || !hasAdminAccess(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const schedule = await DailySchedule.findOne().sort({ createdAt: -1 });
    return NextResponse.json(schedule || {
      english: { title: 'Daily Schedule', subtitle: 'Temple Timing Management', schedules: [] },
      marathi: { title: 'दैनंदिन कार्यक्रम', subtitle: 'मंदिर वेळापत्रक व्यवस्थापन', schedules: [] }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const user = await getDataFromToken();
    if (!user || !hasAdminAccess(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    
    let schedule = await DailySchedule.findOne().sort({ createdAt: -1 });
    
    if (schedule) {
      schedule = await DailySchedule.findByIdAndUpdate(schedule._id, body, { new: true });
    } else {
      schedule = await DailySchedule.create(body);
    }

    return NextResponse.json(schedule);
  } catch (error: any) {
    console.error('SAVE SCHEDULE ERROR:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
