import prisma from '@/prisma';
import { NextResponse } from 'next/server';
import { OrderStatus } from '@prisma/client';

export async function PUT(request) {
  const body = await request.json();
  const { id, approverId } = body;
  try {
    const result = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        approverId,
        approvedDate: new Date(),
        status: OrderStatus.APPROVED,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
