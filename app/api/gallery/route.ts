import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import GalleryAsset from '@/models/Gallery';

// ✅ GET IMAGES
export async function GET() {
  try {
    await dbConnect();

    const images = await GalleryAsset.find().sort({ createdAt: -1 });
    console.log(`[GALLERY API] Fetched ${images.length} images`);

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

    if (!body.imageUrl) {
        return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    console.log('[GALLERY API] Creating new image with body:', body);

    const newImage = await GalleryAsset.create({
      imageUrl: body.imageUrl,
      caption: body.caption || '',
    });

    console.log('[GALLERY API] Successfully created image:', newImage._id);

    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    console.error('POST GALLERY ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    );
  }
}