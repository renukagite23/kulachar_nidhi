import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getDataFromToken() {
  try {
    const headerList = await headers();
    const token = headerList.get('authorization')?.split(' ')[1] || '';
    
    if (!token) return null;

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    return decodedToken;
  } catch (error: any) {
    return null;
  }
}
