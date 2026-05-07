import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';
import crypto from 'crypto';

export async function GET(req: Request) {
  try {
    const decodedToken = await getDataFromToken();
    console.log('API DEBUG: decodedToken:', decodedToken);

    if (!hasAdminAccess(decodedToken)) {
      console.log('API DEBUG: Unauthorized access attempt. User role:', decodedToken?.role);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const query: any = { role: 'collector' };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const collectors = await User.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'referredBy',
          as: 'referrals'
        }
      },
      {
        $lookup: {
          from: 'donations',
          let: { referralIds: '$referrals._id' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$userId', '$$referralIds'] },
                paymentStatus: 'completed'
              }
            },
            { $group: { _id: null, total: { $sum: '$amount' } } }
          ],
          as: 'referralDonations'
        }
      },
      {
        $project: {
          referralCount: { $size: '$referrals' },
          totalReferralDonations: { $ifNull: [{ $arrayElemAt: ['$referralDonations.total', 0] }, 0] },
          name: 1,
          email: 1,
          phone: 1,
          role: 1,
          referralCode: 1,
          isActive: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]);

    const total = await User.countDocuments(query);

    return NextResponse.json({
      collectors,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching collectors:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const decodedToken = await getDataFromToken();
    if (!hasAdminAccess(decodedToken)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { name, email, password, phone, isActive } = await req.json();

    if (!name || !email || !password || !phone) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate unique referral code
    let referralCode = '';
    let isUnique = false;
    while (!isUnique) {
      referralCode = `COLL-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
      const existing = await User.findOne({ referralCode });
      if (!existing) isUnique = true;
    }

    const collector = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: 'collector',
      referralCode,
      isActive: false, // Default to inactive until approved
      approvalStatus: 'pending',
      permissions: {
        canCollectDonations: false,
        canGenerateReceipts: false,
        canViewReports: false,
        canEditBankDetails: false,
        canDeleteDonations: false,
      },
    });

    return NextResponse.json({
      message: 'Collector created successfully',
      collector,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating collector:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
