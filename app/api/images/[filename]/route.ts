import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getDataDirectory } from '../../../../lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    
    // Validate filename to prevent path traversal
    const safeFilename = path.basename(filename);
    const dataDir = getDataDirectory();
    const filePath = path.join(dataDir, 'uploads', safeFilename);

    if (!fs.existsSync(filePath)) {
      return new NextResponse('Imagem não encontrada', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    
    // Determine content type based on extension
    const ext = path.extname(safeFilename).toLowerCase();
    let contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.svg') contentType = 'image/svg+xml';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (err: any) {
    console.error('Erro ao servir imagem:', err);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}
