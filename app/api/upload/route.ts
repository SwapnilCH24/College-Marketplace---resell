import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
  {
    folder: 'icfai-marketplace',

    resource_type:
      file.type === 'application/pdf'
        ? 'raw'
        : 'image',

    public_id:
  file.type === 'application/pdf'
    ? `${Date.now()}`
    : undefined,
  },
          (error, result) => {
  if (error) {
    console.error('UPLOAD ERROR:', error);
    reject(error);
  } else {
    resolve(result);
  }
}
        )
        .end(buffer);
    });

    return NextResponse.json({
  url: result.secure_url,
  public_id: result.public_id,
  resource_type: result.resource_type,
});
  } catch (error: any) {
  console.error('CLOUDINARY ERROR:', error);

  return NextResponse.json(
    {
      error: error?.message || String(error),
    },
    { status: 500 }
  );
}
}