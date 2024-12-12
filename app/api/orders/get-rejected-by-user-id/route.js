import prisma from '@/prisma';
import { NextResponse } from 'next/server';
import { OrderStatus } from '@prisma/client';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  try {
    const orders = await prisma.order.findMany({
      where: {
        AND: [{ creatorId: id }, { status: OrderStatus.REJECTED }],
      },
      orderBy: {
        createdDate: 'asc',
      },
      select: {
        id: true,
        product: {
          select: {
            title: true,
          },
        },
        description: true,
        unit: {
          select: {
            title: true,
          },
        },
        quantityCreated: true,
        createdDate: true,
        rejectedDate: true,
        rejectedBy: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        rejectedReason: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
