import { NextRequest, NextResponse } from 'next/server';
import { getAllConfig, saveConfig } from '../../../lib/db';

export async function GET() {
  try {
    const config = await getAllConfig();
    return NextResponse.json(config);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (typeof data.whatsappNumber === 'string') {
      await saveConfig('whatsappNumber', data.whatsappNumber);
    }
    if (typeof data.pixKey === 'string') {
      await saveConfig('pixKey', data.pixKey);
    }
    if (typeof data.deliveryEnabled === 'boolean') {
      await saveConfig('deliveryEnabled', String(data.deliveryEnabled));
    }
    const updated = await getAllConfig();
    return NextResponse.json({ success: true, ...updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
