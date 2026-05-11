import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Donation from '@/models/Donation';
import User from '@/models/User';
import ActivityLog from '@/models/ActivityLog';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const decoded = await getDataFromToken();
    if (!hasAdminAccess(decoded)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const collectorId = searchParams.get('collector');
    const reason = searchParams.get('reason');
    const paymentMethod = searchParams.get('paymentMethod');
    const status = searchParams.get('status');

    // Build date filter
    const dateFilter: any = {};
    if (from) dateFilter.$gte = new Date(from);
    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      dateFilter.$lte = toDate;
    }

    const donationQuery: any = {};
    if (Object.keys(dateFilter).length) donationQuery.createdAt = dateFilter;
    if (collectorId) donationQuery.collector = collectorId;
    if (reason) donationQuery.reason = { $regex: reason, $options: 'i' };
    if (paymentMethod) donationQuery.paymentMethod = paymentMethod;
    if (status) donationQuery.paymentStatus = status;

    // Fetch all donations matching filter
    const donations = await Donation.find(donationQuery)
      .populate('collector', 'name phone email')
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })
      .lean();

    const completedDonations = donations.filter(d => d.paymentStatus === 'completed');
    const totalAmount = completedDonations.reduce((s, d) => s + (d.amount || 0), 0);

    // --- Date helpers ---
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const todayTotal = completedDonations
      .filter(d => new Date(d.createdAt as any) >= todayStart)
      .reduce((s, d) => s + (d.amount || 0), 0);

    const monthlyTotal = completedDonations
      .filter(d => new Date(d.createdAt as any) >= monthStart)
      .reduce((s, d) => s + (d.amount || 0), 0);

    const yearlyTotal = completedDonations
      .filter(d => new Date(d.createdAt as any) >= yearStart)
      .reduce((s, d) => s + (d.amount || 0), 0);

    const lastMonthTotal = completedDonations
      .filter(d => {
        const d_ = new Date(d.createdAt as any);
        return d_ >= lastMonthStart && d_ <= lastMonthEnd;
      })
      .reduce((s, d) => s + (d.amount || 0), 0);

    // Monthly trend for current year (12 months)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyTrend = monthNames.map((month, idx) => {
      const amount = completedDonations
        .filter(d => {
          const dd = new Date(d.createdAt as any);
          return dd.getMonth() === idx && dd.getFullYear() === now.getFullYear();
        })
        .reduce((s, d) => s + (d.amount || 0), 0);
      return { month, amount };
    });

    // Payment status breakdown
    const paymentStats = {
      completed: donations.filter(d => d.paymentStatus === 'completed').length,
      pending: donations.filter(d => d.paymentStatus === 'pending').length,
      failed: donations.filter(d => d.paymentStatus === 'failed').length,
    };

    // Payment method breakdown
    const methodMap: Record<string, { count: number; amount: number }> = {};
    completedDonations.forEach(d => {
      const m = d.paymentMethod || 'Unknown';
      if (!methodMap[m]) methodMap[m] = { count: 0, amount: 0 };
      methodMap[m].count++;
      methodMap[m].amount += d.amount || 0;
    });
    const paymentMethods = Object.entries(methodMap).map(([method, data]) => ({ method, ...data }));

    // Donation reason breakdown
    const reasonMap: Record<string, { count: number; amount: number }> = {};
    completedDonations.forEach(d => {
      const r = d.reason || 'General';
      if (!reasonMap[r]) reasonMap[r] = { count: 0, amount: 0 };
      reasonMap[r].count++;
      reasonMap[r].amount += d.amount || 0;
    });
    const donationReasons = Object.entries(reasonMap)
      .map(([reason, data]) => ({ reason, ...data }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10);

    // Collector-wise stats
    const collectorMap: Record<string, { name: string; phone: string; count: number; amount: number; lastDate: string }> = {};
    completedDonations.forEach((d: any) => {
      if (d.collector && d.collector._id) {
        const id = String(d.collector._id);
        if (!collectorMap[id]) {
          collectorMap[id] = {
            name: d.collector.name || 'Unknown',
            phone: d.collector.phone || '',
            count: 0,
            amount: 0,
            lastDate: d.createdAt,
          };
        }
        collectorMap[id].count++;
        collectorMap[id].amount += d.amount || 0;
        if (new Date(d.createdAt as any) > new Date(collectorMap[id].lastDate as any)) {
          collectorMap[id].lastDate = d.createdAt as string;
        }
      }
    });
    const collectorStats = Object.entries(collectorMap)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.amount - a.amount);

    // Top donors
    const donorMap: Record<string, { name: string; count: number; amount: number }> = {};
    completedDonations.forEach((d: any) => {
      const name = d.donorName || 'Unknown';
      if (!donorMap[name]) donorMap[name] = { name, count: 0, amount: 0 };
      donorMap[name].count++;
      donorMap[name].amount += d.amount || 0;
    });
    const topDonors = Object.values(donorMap)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10);

    // Total unique donors
    const uniqueDonors = new Set(completedDonations.map(d => d.mobileNumber || d.donorName)).size;

    // Collectors count
    const collectors = await User.find({ role: 'collector' }).lean();

    // Activity logs
    const recentLogs = await ActivityLog.find({})
      .populate('user', 'name role')
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return new Response(JSON.stringify({
      summary: {
        todayTotal,
        monthlyTotal,
        yearlyTotal,
        lastMonthTotal,
        totalAmount,
        totalDonations: donations.length,
        completedDonations: completedDonations.length,
        uniqueDonors,
        collectorsCount: collectors.length,
        paymentStats,
      },
      monthlyTrend,
      paymentMethods,
      donationReasons,
      collectorStats,
      topDonors,
      donations, // full list for the table
      recentLogs,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Reports API error:', error);
    return new Response(JSON.stringify({ message: 'Server error', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
