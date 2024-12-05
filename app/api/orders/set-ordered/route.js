import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";

export async function PUT(request) {
    const { orderId, quantity, executorId } = await request.json();
    try {
        const order = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: OrderStatus.ORDERED,
                orderedDate: new Date(),
                quantityOrdered: parseFloat(quantity),
                orderedById: executorId,
            },
        });
        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}