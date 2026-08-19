import { NextRequest, NextResponse } from 'next/server';

// Let's keep a mutable memory cache for the server runtime
let whatsappNumberCache = process.env.WHATSAPP_NUMBER || '5533998646238';
let pixKeyCache = process.env.PIX_KEY || 'brasaburguer.pix@gmail.com';
let deliveryEnabledCache = true;

export async function GET() {
  return NextResponse.json({
    whatsappNumber: whatsappNumberCache,
    pixKey: pixKeyCache,
    deliveryEnabled: deliveryEnabledCache,
  });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (typeof data.whatsappNumber === 'string') {
      whatsappNumberCache = data.whatsappNumber;
    }
    if (typeof data.pixKey === 'string') {
      pixKeyCache = data.pixKey;
    }
    if (typeof data.deliveryEnabled === 'boolean') {
      deliveryEnabledCache = data.deliveryEnabled;
    }
    return NextResponse.json({ success: true, whatsappNumber: whatsappNumberCache, pixKey: pixKeyCache, deliveryEnabled: deliveryEnabledCache });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 400 });
  }
}
