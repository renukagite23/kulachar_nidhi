import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';

export async function GET() {
    await dbConnect();
    const images = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json(images);
}

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();

    const image = await Gallery.create(body);
    return NextResponse.json(image);
}
