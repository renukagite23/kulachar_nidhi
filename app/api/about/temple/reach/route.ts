import dbConnect from '@/lib/db';
import TempleReach from '@/models/TempleReach';

export async function GET() {
  try {
    await dbConnect();
    // Temporarily removed isPublished filter to help you see the data while testing
    const reach = await TempleReach.findOne().sort({ updatedAt: -1 }).lean();
    
    if (!reach) {
      return new Response(JSON.stringify({ error: 'Reach details not found in database' }), { status: 404 });
    }
    
    return new Response(JSON.stringify(reach), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
