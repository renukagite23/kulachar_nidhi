import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Donation from '@/models/Donation';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';
import mongoose from 'mongoose';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const decoded = await getDataFromToken();

    if (!hasAdminAccess(decoded)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const roleParam = searchParams.get('role');

    // Get the start of the current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    if (roleParam === 'staff') {
      const users = await User.aggregate([
        { $match: { role: { $ne: 'user' } } }, // Only fetch staff/admins/collectors
        {
          $lookup: {
            from: 'donations',
            localField: '_id',
            foreignField: 'collector',
            as: 'collections'
          }
        },
        {
          $addFields: {
            totalCollected: { $sum: '$collections.amount' },
            receiptCount: { $size: '$collections' },
            monthlyCollection: {
              $sum: {
                $map: {
                  input: {
                    $filter: {
                      input: '$collections',
                      as: 'd',
                      cond: { $gte: ['$$d.createdAt', startOfMonth] }
                    }
                  },
                  as: 'f',
                  in: '$$f.amount'
                }
              }
            },
            activeDonors: {
              $size: {
                $setUnion: {
                  $map: {
                    input: '$collections',
                    as: 'd',
                    in: '$$d.mobileNumber'
                  }
                }
              }
            }
          }
        },
        { $project: { password: 0, collections: 0 } },
        { $sort: { createdAt: -1 } }
      ]);
      return NextResponse.json(users);
    } else {
      // Default: Return normal users (devotees)
      const users = await User.find({ role: 'user' }, '-password').sort({ createdAt: -1 });
      return NextResponse.json(users);
    }
  } catch (error: any) {
    console.error('Admin users fetch error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
