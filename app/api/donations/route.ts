import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Donation from '@/models/Donation';
import User from '@/models/User';
import Notification from '@/models/Notification';
import { generateReceiptNumber } from '@/lib/utils';
import { getDataFromToken } from '@/lib/auth';
import { sendDonationReceipt } from '@/lib/email';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log('Donation Request Body:', body);

    // Get user details from token if authenticated
    const decoded = await getDataFromToken();
    let userId = null;

    if (decoded && decoded.id) {
      userId = decoded.id;
    }

    const donation = await Donation.create({
      ...body,
      receiptNumber: generateReceiptNumber(),
      paymentStatus: 'completed',
      ...(userId && { userId }),
    });

    // Create Notification
    try {
      await Notification.create({
        title: 'New Donation Received',
        message: `${donation.donorName} donated ₹${donation.amount} for ${donation.purpose}.`,
        type: 'donation',
      });
    } catch (notifError) {
      console.error('Failed to create notification:', notifError);
    }

    // Increment user's totalDonations if authenticated
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $inc: { totalDonations: donation.amount }
      });
    }

    // Send email receipt automatically
    try {
      if (donation.email) {
        await sendDonationReceipt(donation);
      }
    } catch (emailError) {
      console.error('Failed to send email receipt:', emailError);
      // We don't throw here to avoid failing the donation response
    }

    return NextResponse.json({ success: true, data: donation }, { status: 201 });
  } catch (error: any) {
    console.error('Donation API Error:', error);
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
