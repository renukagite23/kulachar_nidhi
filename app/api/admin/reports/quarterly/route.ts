import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

import User from '@/models/User';
import Donation from '@/models/Donation';
import Event from '@/models/Event';

export async function GET() {
    try {
        await dbConnect();

        const totalUsers = await User.countDocuments();
        const totalEvents = await Event.countDocuments();

        const donations = await Donation.find();

        const totalDonationAmount = donations.reduce(
            (sum, d) => sum + (d.amount || 0),
            0
        );

        const totalDonationsCount = donations.length;

        const recentTransactions = await Donation.find()
            .sort({ createdAt: -1 })
            .limit(10);

        return NextResponse.json({
            stats: {
                totalUsers,
                totalEvents,
                totalDonationsCount,
                totalDonationAmount,
            },
            recentTransactions,
        });

    } catch (error) {
        console.error('Quarterly Report Error:', error);

        return NextResponse.json(
            { error: 'Failed to generate report' },
            { status: 500 }
        );
    }
} 