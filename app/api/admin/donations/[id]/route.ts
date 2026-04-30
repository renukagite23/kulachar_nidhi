import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Donation from '@/models/Donation';
import { getDataFromToken } from '@/lib/auth';

async function checkAdmin() {
  const decoded = await getDataFromToken();
  if (!decoded || decoded.role !== 'admin') return false;
  return true;
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    if (!(await checkAdmin())) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await Donation.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: 'Donation not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Donation deleted successfully' });
  } catch (error: any) {
    console.error('Admin donation delete error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
