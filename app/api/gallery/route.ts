import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';

const GallerySchema = new mongoose.Schema(
  {
    title: String,
    image: String,
  },
  { timestamps: true }
);

const Gallery =
  mongoose.models.Gallery ||
  mongoose.model('Gallery', GallerySchema);

// ✅ GET IMAGES
export async function GET() {
  try {
    await dbConnect();

    const images = await Gallery.find().sort({ createdAt: -1 });

    return NextResponse.json(images);
  } catch (error) {
    console.error('GET GALLERY ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

// ✅ ADD IMAGE
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const newImage = await Gallery.create({
      title: body.title,
      image: body.image,
    });

    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    console.error('POST GALLERY ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    );
  }
}