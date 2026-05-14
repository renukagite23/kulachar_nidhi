import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';

// GET all contact messages
export async function GET() {
  try {
    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Admin Contact GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE a contact message
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await dbConnect();
    await Contact.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Admin Contact DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH - update status or isRead
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, isRead, status } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await dbConnect();
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { $set: { ...(isRead !== undefined && { isRead }), ...(status && { status }) } },
      { new: true }
    );

    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error('Admin Contact PATCH error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
