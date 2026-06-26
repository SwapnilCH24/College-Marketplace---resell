import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file found' }, { status: 400 });
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const path = join(process.cwd(), 'public/uploads', fileName);
    await writeFile(path, buffer);
    return NextResponse.json({ url: `/uploads/${fileName}` });
  } catch (error) { return NextResponse.json({ error: 'Upload Failed' }, { status: 500 }); }
}