import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ActivityLog from '@/models/ActivityLog';

export async function GET() {
    try {
        await dbConnect();

        const logs = await ActivityLog.find()
            .populate('user', 'name')
            .sort({ createdAt: -1 });

        return NextResponse.json({
            logs,
        });

    } catch (error) {
        console.error('Export Logs Error:', error);

        return NextResponse.json(
            { error: 'Failed to export logs' },
            { status: 500 }
        );
    }
}