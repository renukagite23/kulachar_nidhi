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

    const totalUsers = await User.countDocuments({
      role: { $nin: ['admin', 'president'] }
    });
    const totalDonationsArray = await Donation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalDonationAmount = totalDonationsArray[0]?.total || 0;

    const totalDonationsCount = await Donation.countDocuments({ paymentStatus: 'completed' });
    const totalEvents = await Event.countDocuments();

    // --- NEW DYNAMIC STATS ---
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Monthly Collection
    const monthlyCollectionArray = await Donation.aggregate([
      { $match: { paymentStatus: 'completed', donationDate: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const monthlyCollection = monthlyCollectionArray[0]?.total || 0;

    // Monthly Collection (Last Month)
    const lastMonthCollectionArray = await Donation.aggregate([
      { $match: { 
          paymentStatus: 'completed', 
          donationDate: { $gte: startOfLastMonth, $lt: startOfMonth } 
      } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const lastMonthCollection = lastMonthCollectionArray[0]?.total || 0;

    // Monthly Growth
    let monthlyGrowth = 0;
    if (lastMonthCollection > 0) {
      monthlyGrowth = ((monthlyCollection - lastMonthCollection) / lastMonthCollection) * 100;
    } else if (monthlyCollection > 0) {
      monthlyGrowth = 100;
    }

    // Top Collector (using aggregation for better accuracy)
    const topCollectorArray = await Donation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { 
          _id: '$collector', 
          totalAmount: { $sum: '$amount' } 
      } },
      { $sort: { totalAmount: -1 } },
      { $limit: 1 },
      { $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
      } },
      { $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true } }
    ]);

    const topCollector = topCollectorArray[0] ? {
      name: topCollectorArray[0].userDetails?.name || 'System',
      totalAmount: topCollectorArray[0].totalAmount
    } : { name: 'N/A', totalAmount: 0 };

    // Collector Counts
    const activeCollectorsCount = await User.countDocuments({ role: 'collector', isActive: true });
    const inactiveCollectorsCount = await User.countDocuments({ role: 'collector', isActive: false });

    const recentTransactions = await Donation.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const stats = {
      totalUsers,
      totalDonationAmount,
      totalDonationsCount,
      totalEvents,
      recentTransactions,
      topCollector,
      monthlyCollection,
      monthlyGrowth: monthlyGrowth.toFixed(1),
      activeCollectorsCount,
      inactiveCollectorsCount,
    };

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Admin stats error:', error);
    return new Response(JSON.stringify({ message: 'Server error', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
