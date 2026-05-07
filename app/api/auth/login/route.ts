import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Check approval status for roles that require manual authorization (collectors, agents, etc.)
    const rolesRequiringApproval = ['collector', 'agent', 'staff', 'chairman'];
    if (rolesRequiringApproval.includes(user.role) && user.approvalStatus !== 'approved') {
      return NextResponse.json(
        { message: `Access denied. Your account status is ${user.approvalStatus || 'pending'}.` },
        { status: 403 }
      );
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      'secret_key',
      { expiresIn: '1d' }
    );


    const isAdminAccess = user.role === 'admin' || user.role === 'president';
    const cookieName = isAdminAccess ? 'admin_token' : 'token';

    const response = NextResponse.json({
      message: 'Logged in successfully',
      token,
      cookieName, // Inform client which cookie was set
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        totalDonations: user.totalDonations,
      },
    });

    // Set role-specific cookie for middleware
    response.cookies.set(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Server error during login' },
      { status: 500 }
    );

  }
}