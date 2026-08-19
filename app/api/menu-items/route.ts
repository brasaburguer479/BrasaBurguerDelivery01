import { NextRequest, NextResponse } from 'next/server';
import { getMenuItems, saveMenuItem, updateMenuItem } from '../../../lib/db';

export async function GET() {
  try {
    const items = await getMenuItems();
    return NextResponse.json({
      success: true,
      menuItems: items,
      message: 'Cardápio sincronizado com o banco de dados local do container!'
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
    const { id, name, category, price, description, image, hidden } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'O ID do item é obrigatório.' }, { status: 400 });
    }

    const updatedItem = await updateMenuItem({
      id,
      name,
      category,
      price,
      description,
      image,
      hidden: hidden !== undefined ? hidden : false
    });

    return NextResponse.json({
      success: true,
      message: 'Item do cardápio atualizado com sucesso!',
      menuItem: updatedItem
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, category, price, description, image, hidden } = body;

    if (!id || !name || !category || price === undefined) {
      return NextResponse.json({ success: false, error: 'Campos id, name, category e price são obrigatórios.' }, { status: 400 });
    }

    const newItem = await saveMenuItem({
      id,
      name,
      category,
      price,
      description: description || '',
      image: image || '/Bacon Grill.jpg',
      hidden: hidden || false
    });

    return NextResponse.json({
      success: true,
      message: 'Item criado com sucesso!',
      menuItem: newItem
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
