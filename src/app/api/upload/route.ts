import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const productName = formData.get('productName') as string;
    const price = formData.get('price') as string;
    
    if (!file || !productName || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const fileExtension = file.name.split('.').pop();
    const newFileName = `${productName}-${price}.${fileExtension}`;

    const blob = await put(newFileName, file, {
      access: 'public',
      addRandomSuffix: true
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
