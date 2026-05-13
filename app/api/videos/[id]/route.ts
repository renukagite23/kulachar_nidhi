import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Video from '@/models/Video';

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params;

    const deletedVideo = await Video.findByIdAndDelete(id);

    if (!deletedVideo) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Video deleted successfully',
    });

  } catch (error) {
    console.error('DELETE VIDEO ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    );
  }
}