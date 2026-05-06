import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { getDataFromToken } from '@/lib/auth';

async function checkAdmin() {
  const decoded = await getDataFromToken();
  if (!decoded || decoded.role !== 'admin') return false;
  return true;
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    if (!(await checkAdmin())) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    
    const mongoose = require('mongoose');
    const collectorData = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id), role: 'collector' } },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'referredBy',
          as: 'referrals'
        }
      },
      {
        $unwind: { path: '$referrals', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'donations',
          let: { userId: '$referrals._id' },
          pipeline: [
            { 
              $match: { 
                $expr: { $eq: ['$userId', '$$userId'] },
                paymentStatus: 'completed'
              } 
            },
            { $group: { _id: null, total: { $sum: '$amount' } } }
          ],
          as: 'referralDonations'
        }
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          email: { $first: '$email' },
          phone: { $first: '$phone' },
          referralCode: { $first: '$referralCode' },
          isActive: { $first: '$isActive' },
          createdAt: { $first: '$createdAt' },
          referredUsers: {
            $push: {
              $cond: [
                { $ifNull: ['$referrals._id', false] },
                {
                  _id: '$referrals._id',
                  name: '$referrals.name',
                  email: '$referrals.email',
                  phone: '$referrals.phone',
                  totalDonated: { $ifNull: [{ $arrayElemAt: ['$referralDonations.total', 0] }, 0] },
                  createdAt: '$referrals.createdAt'
                },
                '$$REMOVE'
              ]
            }
          }
        }
      }
    ]);

    if (!collectorData || collectorData.length === 0) {
      return NextResponse.json({ message: 'Collector not found' }, { status: 404 });
    }

    // Calculate total amount raised across all referrals for this collector
    const collector = {
      ...collectorData[0],
      totalRaised: collectorData[0].referredUsers.reduce((sum: number, user: any) => sum + (user.totalDonated || 0), 0)
    };

    return NextResponse.json(collector);
  } catch (error: any) {
    console.error('Error fetching collector:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    if (!(await checkAdmin())) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { name, email, phone, isActive, password } = body;

    const collector = await User.findOne({ _id: id, role: 'collector' });
    if (!collector) {
      return NextResponse.json({ message: 'Collector not found' }, { status: 404 });
    }

    const updateData: any = { name, email, phone, isActive };

    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedCollector = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    return NextResponse.json({
      message: 'Collector updated successfully',
      collector: updatedCollector,
    });
  } catch (error: any) {
    console.error('Error updating collector:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    if (!(await checkAdmin())) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const collector = await User.findOneAndDelete({ _id: id, role: 'collector' });

    if (!collector) {
      return NextResponse.json({ message: 'Collector not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Collector deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting collector:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
