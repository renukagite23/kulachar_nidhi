import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Donation from '@/models/Donation';
import { generateReceiptNumber } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const donation = await Donation.create({
      ...body,
      receiptNumber: generateReceiptNumber(),
      paymentStatus: 'completed', // For demo purposes, we mark it completed immediately
    });

    return NextResponse.json({ success: true, data: donation }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const donations = await Donation.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: donations });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
