import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';

export async function POST(req: Request) {
    try {
        const user = await getDataFromToken();
        if (!user || !hasAdminAccess(user)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Path to save the file
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'about');

        // Ensure directory exists
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const path = join(uploadDir, fileName);

        await writeFile(path, buffer);

        const relativePath = `/uploads/about/${fileName}`;

        return NextResponse.json({ url: relativePath });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
