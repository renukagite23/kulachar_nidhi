import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Video from '@/models/Video';

// ✅ GET VIDEOS
export async function GET() {
  try {
    await dbConnect();
    const videos = await Video.find().sort({ createdAt: -1 });
    return NextResponse.json(videos);
  } catch (error) {
    console.error('GET VIDEOS ERROR:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}

// ✅ ADD VIDEO
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.videoUrl) {
      return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
    }

    // Basic YouTube URL check
    const isYouTube = body.videoUrl.includes('youtube.com') || body.videoUrl.includes('youtu.be');
    
    let thumbnailUrl = body.thumbnailUrl || '';
    if (isYouTube && !thumbnailUrl) {
        // Extract YouTube ID for thumbnail
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = body.videoUrl.match(regExp);
        if (match && match[2].length === 11) {
            thumbnailUrl = `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
        }
    }

    const newVideo = await Video.create({
      videoUrl: body.videoUrl,
      title: body.title || '',
      description: body.description || '',
      thumbnailUrl,
      isYouTube
    });

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error('POST VIDEO ERROR:', error);
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
  }
}
