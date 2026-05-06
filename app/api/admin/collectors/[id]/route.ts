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
    const collector = await User.findOne({ _id: id, role: 'collector' }).select('-password');

    if (!collector) {
      return NextResponse.json({ message: 'Collector not found' }, { status: 404 });
    }

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
