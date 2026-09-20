import { NextRequest, NextResponse } from 'next/server';
import { getNeighborhoods, updateNeighborhood, saveNeighborhood, deleteNeighborhood } from '../../../lib/db';

export async function GET() {
  try {
    const list = await getNeighborhoods();
    return NextResponse.json({
      success: true,
      neighborhoods: list,
      message: 'Taxas de entrega sincronizadas com o banco de dados local do container!'
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, rate } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ success: false, error: 'O nome do bairro é obrigatório.' }, { status: 400 });
    }

    if (rate === undefined || rate === null || rate === '') {
      return NextResponse.json({ success: false, error: 'O valor da taxa é obrigatório.' }, { status: 400 });
    }

    const parsedRate = Number(typeof rate === 'string' ? rate.trim().replace(',', '.') : rate);
    if (isNaN(parsedRate) || parsedRate < 0) {
      return NextResponse.json({ success: false, error: 'O valor da taxa deve ser um número válido maior ou igual a zero.' }, { status: 400 });
    }

    const updated = await updateNeighborhood(name.trim(), parsedRate);

    return NextResponse.json({
      success: true,
      message: 'Taxa do bairro atualizada com sucesso!',
      neighborhood: updated
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, rate } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ success: false, error: 'O nome do bairro é obrigatório.' }, { status: 400 });
    }

    if (rate === undefined || rate === null || rate === '') {
      return NextResponse.json({ success: false, error: 'O valor da taxa é obrigatório.' }, { status: 400 });
    }

    const parsedRate = Number(typeof rate === 'string' ? rate.trim().replace(',', '.') : rate);
    if (isNaN(parsedRate) || parsedRate < 0) {
      return NextResponse.json({ success: false, error: 'O valor da taxa deve ser um número válido maior ou igual a zero.' }, { status: 400 });
    }

    const saved = await saveNeighborhood({ name: name.trim(), rate: parsedRate });

    return NextResponse.json({
      success: true,
      message: 'Bairro salvo com sucesso!',
      neighborhood: saved
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const name = url.searchParams.get('name');

    if (!name) {
      return NextResponse.json({ success: false, error: 'O nome do bairro é obrigatório para exclusão.' }, { status: 400 });
    }

    const deleted = await deleteNeighborhood(name);

    if (deleted) {
      return NextResponse.json({
        success: true,
        message: 'Bairro excluído com sucesso!'
      });
    } else {
      return NextResponse.json({ success: false, error: 'Bairro não encontrado.' }, { status: 404 });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
