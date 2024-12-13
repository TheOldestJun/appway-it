import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";

export async function PUT(request) {
    const { orderId, quantity, receiverId } = await request.json();

    try {
    let result = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
        quantityCreated: true,
        quantityOrdered: true,
        quantityReceived: true,
      },
    });
    const isEnough =
      result.quantityOrdered <= result.quantityReceived + parseFloat(quantity);
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: isEnough ? OrderStatus.RECEIVED : OrderStatus.ORDER_PENDING,
        receivedDate: new Date(),
        quantityOrdered: result.quantityOrdered + parseFloat(quantity),
        quantityReceived: result.quantityReceived + parseFloat(quantity),
        receivedById: receiverId,
      },
    });
    return NextResponse.json(order);

    }catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}