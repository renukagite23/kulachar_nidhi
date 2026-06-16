import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { getDataFromToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const decoded = await getDataFromToken();

        if (!decoded) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { token } = await request.json();

        if (!token) {
            return NextResponse.json(
                { message: 'FCM token is required' },
                { status: 400 }
            );
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Save token here
        user.fcmToken = token;
        await user.save();

        return NextResponse.json({
            success: true,
            message: 'FCM token saved successfully',
        });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}