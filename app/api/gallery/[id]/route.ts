import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import GalleryAsset from '@/models/Gallery';

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect();
    const { id } = await params;

    await GalleryAsset.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
}
