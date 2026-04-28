import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Donation from '@/models/Donation';
import User from '@/models/User';
import { getDataFromToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const decoded = await getDataFromToken();

    // userId will be added if user is logged in
    const donationData = {
      ...body,
      userId: decoded?.id || null,
    };

    const donation = await Donation.create(donationData);

    // If user is logged in, update their total donations
    if (decoded?.id) {
      await User.findByIdAndUpdate(decoded.id, {
        $inc: { totalDonations: body.amount }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Donation recorded successfully',
      donation,
    });
  } catch (error: any) {
    console.error('Donation error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error during donation' },
      { status: 500 }
    );
  }
}
