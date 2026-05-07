import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Donation from '@/models/Donation';
import Event from '@/models/Event';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';

export async function GET() {
  try {
    await dbConnect();
    const decoded = await getDataFromToken();

    if (!hasAdminAccess(decoded)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalDonationsArray = await Donation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalDonationAmount = totalDonationsArray[0]?.total || 0;

    const totalDonationsCount = await Donation.countDocuments({ paymentStatus: 'completed' });
    const totalEvents = await Event.countDocuments();

    const recentTransactions = await Donation.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const stats = {
      totalUsers,
      totalDonationAmount,
      totalDonationsCount,
      totalEvents,
      recentTransactions,
    };

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
