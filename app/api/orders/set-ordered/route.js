import prisma from '@/prisma';
import { NextResponse } from 'next/server';
import { OrderStatus } from '@prisma/client';

export async function PUT(request) {
  const { orderId, quantity, executorId } = await request.json();
  try {
    let result = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
        quantityCreated: true,
        quantityOrdered: true,
      },
    });
    const isEnough =
      result.quantityCreated <= result.quantityOrdered + parseFloat(quantity);

    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: isEnough ? OrderStatus.ORDERED : OrderStatus.ORDER_PENDING,
        orderedDate: new Date(),
        quantityOrdered: result.quantityOrdered + parseFloat(quantity),
        orderedById: executorId,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
