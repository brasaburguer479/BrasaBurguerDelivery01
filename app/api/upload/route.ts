import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getDataDirectory } from '../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Create a safe, unique filename
    const ext = path.extname(file.name) || '';
    const safeName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `${Date.now()}-${safeName}${ext}`;

    const dataDir = getDataDirectory();
    const uploadDir = path.join(dataDir, 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/api/images/${filename}`,
      message: 'Upload concluído com sucesso!'
    });
  } catch (err: any) {
    console.error('Upload erro:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
