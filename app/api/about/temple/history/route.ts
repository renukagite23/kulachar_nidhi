import dbConnect from '@/lib/db';
import TempleHistory from '@/models/TempleHistory';

export async function GET() {
  try {
    await dbConnect();
    // Temporarily removed isPublished filter to help you see the data while testing
    const history = await TempleHistory.findOne().sort({ updatedAt: -1 }).lean();

    if (!history) {
      return new Response(JSON.stringify({ error: 'History not found in database' }), { status: 404 });
    }

    return new Response(JSON.stringify(history), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
