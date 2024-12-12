import prisma from '@/prisma';
import { NextResponse } from 'next/server';
import { OrderStatus } from '@prisma/client';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  try {
    const orders = await prisma.order.findMany({
      where: {
        AND: [
          { creatorId: id },
          { deleted: false },
          { status: { not: OrderStatus.REJECTED } },
        ],
      },
      orderBy: {
        createdDate: 'asc',
      },
      select: {
        id: true,
        status: true,
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
        quantityOrdered: true,
        quantityReceived: true,
        createdBy: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        createdDate: true,
        closedDate: true,
        approvedBy: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        approvedDate: true,
        orderedBy: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        orderedDate: true,
        receivedBy: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        receivedDate: true,
      },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
