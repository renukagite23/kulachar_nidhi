import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getDataFromToken() {
  try {
    const headerList = await headers();
    const bearerToken = headerList.get('authorization')?.split(' ')[1];
    
    // Check Authorization header first
    let token = bearerToken || '';

    // If no bearer token, check cookies
    if (!token) {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      token = cookieStore.get('admin_token')?.value || cookieStore.get('token')?.value || '';
    }
    
    if (!token) return null;

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    return decodedToken;
  } catch (error: any) {
    return null;
  }
}
