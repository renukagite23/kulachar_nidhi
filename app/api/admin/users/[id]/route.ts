import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import ActivityLog from '@/models/ActivityLog';
import { getDataFromToken } from '@/lib/auth';

async function checkAdmin() {
  const decoded = await getDataFromToken();
  if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'president')) return null;
  return decoded;
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const adminUser = await checkAdmin();
    if (!adminUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    // Never allow password update from this route
    delete body.password;

    const oldUser = await User.findById(id);
    if (!oldUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true, select: '-password' }
    );

    // Log the activity
    await ActivityLog.create({
      user: adminUser.id,
      action: `Updated user: ${updatedUser.name} (${updatedUser.role})`,
      details: `Changes: ${JSON.stringify(body)}`,
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error('Admin user update error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const adminUser = await checkAdmin();
    if (!adminUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Log the activity
    await ActivityLog.create({
      user: adminUser.id,
      action: `Deleted user: ${deleted.name}`,
      details: `User ID: ${id}`,
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    console.error('Admin user delete error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
