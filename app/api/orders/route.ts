import { NextRequest, NextResponse } from 'next/server';
import { getOrders, saveOrder, updateOrderStatus, deleteOrder, deleteOrders, deleteAllOrders } from '../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerPhone,
      deliveryMethod,
      neighborhoodName,
      deliveryRate,
      complementInfo,
      paymentMethod,
      cashChangeFor,
      total,
      cart,
      itemExtras,
      observations,
    } = body;

    const newOrder = await saveOrder({
      customer_name: customerName || 'Anônimo',
      customer_phone: customerPhone || '',
      delivery_method: deliveryMethod,
      neighborhood: neighborhoodName || null,
      delivery_rate: deliveryRate || 0,
      complement_info: complementInfo || '',
      payment_method: paymentMethod,
      cash_change_for: cashChangeFor || '',
      total: total,
      cart: cart || {},
      observations: observations || {},
      item_extras: itemExtras || {},
    });

    return NextResponse.json({
      success: true,
      message: 'Pedido gravado com sucesso!',
      order: newOrder,
    });
  } catch (err: any) {
    console.error('Internal API error in local integration:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const ordersList = await getOrders();
    return NextResponse.json({
      success: true,
      orders: ordersList,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Campos "id" e "status" são obrigatórios.' }, { status: 400 });
    }

    const updated = await updateOrderStatus(id, status);

    return NextResponse.json({
      success: true,
      message: 'Status do pedido atualizado com sucesso!',
      order: updated
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const ids = searchParams.get('ids');

    if (!id && !ids) {
      return NextResponse.json({ success: false, error: 'O parâmetro "id" ou "ids" é obrigatório.' }, { status: 400 });
    }

    if (id === 'all') {
      await deleteAllOrders();
      return NextResponse.json({
        success: true,
        message: 'Todos os pedidos foram excluídos com sucesso!'
      });
    }

    if (ids) {
      const idsList = ids.split(',');
      await deleteOrders(idsList);
      return NextResponse.json({
        success: true,
        message: 'Pedidos selecionados excluídos com sucesso!'
      });
    }

    if (id) {
      const deleted = await deleteOrder(id);
      if (!deleted) {
        return NextResponse.json({ success: false, error: 'Pedido não encontrado.' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: 'Pedido excluído com sucesso!'
      });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
